#!/usr/bin/env bash
#
# visibility-run.sh
#
# One measurement cycle of the hendricks.ai visibility program, end to end,
# safe to run from a scheduler.
#
#   dry-run and check the estimate against a ceiling
#   run the probe on the Ultra
#   gate the manifest: nothing carried forward, cell count unchanged
#   compare against the newest previous comparison-eligible run
#   update .claude/state/visibility-state.json, atomically, measurement block only
#   write .claude/state/reports/<run_id>.md
#
# What it never does. It never writes to production, never edits site content,
# never runs a build or a deploy, never commits, never pushes, and never opens
# a pull request. It touches exactly two paths in this repo, both under
# .claude/state/. This project has published a false claim twice and a
# human-reviewed gate caught it both times, so the boundary is the point.
#
# Exit codes, all non-zero so a scheduler can see them:
#   0  cycle completed
#   1  precondition failed (repo, state, ssh, python)
#   2  dry-run estimate exceeded the cost ceiling, nothing spent
#   3  a cycle already ran today, use --force to override
#   4  the probe itself failed
#   5  manifest gate failed (carried-forward cells, or the query set changed)
#   6  analysis or state update failed
#
# Usage:
#   scripts/visibility-run.sh                 full cycle
#   scripts/visibility-run.sh --dry-run       estimate only, spends nothing
#   scripts/visibility-run.sh --rebuild-state rebuild memory from archives, spends nothing
#   scripts/visibility-run.sh --force         run even if a cycle already ran today
#
# Environment overrides:
#   VIS_REPO VIS_SSH_HOST VIS_CLIENT VIS_ENGINES VIS_COST_CEILING VIS_LOG_DIR
#
set -Eeuo pipefail

VIS_REPO="${VIS_REPO:-/Users/brandonlhendricks/dev/hendricks-ai}"
VIS_SSH_HOST="${VIS_SSH_HOST:-ultra}"
VIS_CLIENT="${VIS_CLIENT:-hendricks}"
VIS_ENGINES="${VIS_ENGINES:-chat_gpt,perplexity,google_aio}"

# The ceiling is checked against the DRY-RUN ESTIMATE, which is not the bill.
# Measured on 2026-08-19: the estimator said $1.33 and the run billed $0.3835,
# so it overstates by roughly 3.5 times. A ceiling near the real cost would
# abort every healthy run. $2.00 clears a normal 17-question three-engine run
# with room, and still trips on the failures worth tripping on: the query set
# doubling, or --client being dropped so all thirteen clients run, which
# estimates near $14.
VIS_COST_CEILING="${VIS_COST_CEILING:-2.00}"

# Not /tmp. On 2026-08-19 /tmp cleared and took the evidence for a disputed
# run with it. ~/Library/Logs survives reboots and is not swept.
VIS_LOG_DIR="${VIS_LOG_DIR:-$HOME/Library/Logs/hendricks-visibility}"

STATE_DIR="$VIS_REPO/.claude/state"
STATE_FILE="$STATE_DIR/visibility-state.json"
REPORT_DIR="$STATE_DIR/reports"
REMOTE_CHECKER='~/claudecode/total-search-dashboard/checker'
REMOTE_CREDS='~/.config/dataforseo/creds.env'

MODE="cycle"
FORCE="no"
for arg in "$@"; do
  case "$arg" in
    --dry-run)       MODE="dryrun" ;;
    --rebuild-state) MODE="rebuild" ;;
    --force)         FORCE="yes" ;;
    -h|--help)       sed -n '2,40p' "$0"; exit 0 ;;
    *) printf 'unknown argument: %s\n' "$arg" >&2; exit 1 ;;
  esac
done

TODAY="$(date +%Y-%m-%d)"
STARTED_AT="$(date +%Y-%m-%dT%H:%M:%S%z)"
mkdir -p "$VIS_LOG_DIR"
LOG_FILE="$VIS_LOG_DIR/visibility-run-$TODAY.log"
# Everything is logged, and stdout stays stdout while stderr stays stderr, so a
# scheduler writing the two streams to different files still sees failures in
# the error file rather than buried in the transcript.
exec 3>&1 4>&2
exec 1> >(tee -a "$LOG_FILE" >&3) 2> >(tee -a "$LOG_FILE" >&4)

TMPDIR_RUN="$(mktemp -d "${TMPDIR:-/tmp}/visrun.XXXXXX")"
cleanup() { rm -rf "$TMPDIR_RUN"; }
trap cleanup EXIT
trap 'printf "\n[%s] ABORTED at line %s\n" "$(date +%H:%M:%S)" "$LINENO" >&2' ERR

say()  { printf '[%s] %s\n' "$(date +%H:%M:%S)" "$*"; }
fail() { printf '\n[%s] FAIL: %s\n' "$(date +%H:%M:%S)" "$1" >&2; exit "${2:-1}"; }
rule() { printf -- '----------------------------------------------------------------\n'; }

rule
say "visibility-run.sh  mode=$MODE  client=$VIS_CLIENT  engines=$VIS_ENGINES"
say "repo=$VIS_REPO"
say "log=$LOG_FILE"
rule

# ---------------------------------------------------------------- preconditions
[ -d "$VIS_REPO" ] || fail "repo not found: $VIS_REPO" 1
command -v python3 >/dev/null 2>&1 || fail "python3 not on PATH" 1

if [ ! -f "$STATE_FILE" ]; then
  if [ "$MODE" = "rebuild" ]; then
    say "state file absent, --rebuild-state will create it"
  else
    fail "state file absent: $STATE_FILE
Run with --rebuild-state to reconstruct it from the archives without spending anything.
Do not hand-write one. See $STATE_DIR/README.md." 1
  fi
fi

say "checking ssh to $VIS_SSH_HOST"
ssh -o BatchMode=yes -o ConnectTimeout=15 "$VIS_SSH_HOST" true \
  || fail "cannot reach $VIS_SSH_HOST over ssh. Tailscale key expiry is the usual cause." 1
say "ssh ok"

# ------------------------------------------------------- already ran today?
if [ "$MODE" = "cycle" ] && [ "$FORCE" = "no" ] && [ -f "$STATE_FILE" ]; then
  LAST_DATE="$(python3 -c '
import json,sys
try:
    d=json.load(open(sys.argv[1]))
    print((d.get("run_of_record") or {}).get("date_stamp") or "")
except Exception:
    print("")
' "$STATE_FILE")"
  if [ "$LAST_DATE" = "$TODAY" ]; then
    say "a cycle is already recorded for $TODAY (run of record dated $LAST_DATE)"
    say "the probe is not run twice in a day without a stated reason."
    say "override with --force, and write the reason into the report and into state."
    exit 3
  fi
fi

# ------------------------------------------------------------------ dry run
if [ "$MODE" != "rebuild" ]; then
  say "dry run, no API calls"
  DRY_OUT="$(ssh "$VIS_SSH_HOST" \
    "cd $REMOTE_CHECKER && set -a && . $REMOTE_CREDS && set +a && \
     python3 daily_citations.py --client '$VIS_CLIENT' --engines '$VIS_ENGINES' --dry-run" 2>&1)" \
    || fail "dry run failed:
$DRY_OUT" 1
  printf '%s\n' "$DRY_OUT"

  EST="$(printf '%s\n' "$DRY_OUT" | sed -n 's/.*~\$\([0-9.]*\) est.*/\1/p' | head -1)"
  [ -n "$EST" ] || fail "could not parse a cost estimate out of the dry run. Output above." 1

  OVER="$(python3 -c 'import sys;print("1" if float(sys.argv[1])>float(sys.argv[2]) else "0")' "$EST" "$VIS_COST_CEILING")"
  if [ "$OVER" = "1" ]; then
    fail "estimate \$$EST exceeds ceiling \$$VIS_COST_CEILING. Nothing was spent.
A jump this size usually means the query set grew or --client was dropped.
Check the query set before raising VIS_COST_CEILING." 2
  fi
  say "estimate \$$EST is within ceiling \$$VIS_COST_CEILING"
  say "note: the estimator has run about 3.5x the billed amount. Expect roughly \$0.38."

  if [ "$MODE" = "dryrun" ]; then
    say "--dry-run requested, stopping before the probe. Nothing spent, state untouched."
    exit 0
  fi
fi

# ------------------------------------------------------------------ the probe
RUN_ID=""
PROBE_RC=""
if [ "$MODE" = "cycle" ]; then
  say "running the probe. This spends money."
  PROBE_LOG="$TMPDIR_RUN/probe.out"
  set +e
  ssh "$VIS_SSH_HOST" \
    "cd $REMOTE_CHECKER && set -a && . $REMOTE_CREDS && set +a && \
     python3 daily_citations.py --client '$VIS_CLIENT' --engines '$VIS_ENGINES'" \
    > "$PROBE_LOG" 2>&1
  PROBE_RC=$?
  set -e
  cat "$PROBE_LOG"

  if [ "$PROBE_RC" -ne 0 ]; then
    case "$PROBE_RC" in
      2) fail "probe exit 2: nothing was measured. Every cell holds error text, not data.
Do not report from this run. Check auth first:
  ssh $VIS_SSH_HOST 'curl -u \"\$DATAFORSEO_LOGIN:\$DATAFORSEO_PASSWORD\" https://api.dataforseo.com/v3/appendix/user_data'" 4 ;;
      1) fail "probe exit 1: under half the cells were measured. Treat this run as incomplete and do not compare against it." 4 ;;
      *) fail "probe exited $PROBE_RC" 4 ;;
    esac
  fi

  RUN_ID="$(sed -n 's/.*(run_id \([0-9-]*\)).*/\1/p' "$PROBE_LOG" | tail -1)"
  if [ -n "$RUN_ID" ]; then
    say "run id from probe output: $RUN_ID"
  else
    say "probe printed no run id, falling back to the newest manifest"
    RUN_ID="$(ssh "$VIS_SSH_HOST" \
      "ls -t $REMOTE_CHECKER/history/runs/manifest-*.json 2>/dev/null | head -1" \
      | sed -n 's/.*manifest-\(.*\)\.json/\1/p')"
    [ -n "$RUN_ID" ] || fail "no run id available from output or archive" 4
    say "run id from archive: $RUN_ID"
  fi
else
  say "--rebuild-state: no probe, nothing spent. Reading the archives."
  RUN_ID="NEWEST"
fi

# ------------------------------------------------- analysis on the machine with the data
say "analysing archives on $VIS_SSH_HOST"
ANALYSIS="$TMPDIR_RUN/analysis.json"
set +e
ssh "$VIS_SSH_HOST" "python3 - '$VIS_CLIENT' '$VIS_ENGINES' '$RUN_ID'" > "$ANALYSIS" 2>"$TMPDIR_RUN/analysis.err" <<'PYEOF'
import collections, glob, json, os, re, sys, hashlib

client, engines_csv, target = sys.argv[1], sys.argv[2], sys.argv[3]
engines = [e.strip() for e in engines_csv.split(",") if e.strip()]
HOME = os.path.expanduser("~")
CHECK = os.path.join(HOME, "claudecode", "total-search-dashboard", "checker")
RUNS = os.path.join(CHECK, "history", "runs")

def manifest_path(rid): return os.path.join(RUNS, "manifest-%s.json" % rid)
def archive_path(rid):  return os.path.join(RUNS, "%s-%s.json" % (client, rid))

def load(p):
    with open(p) as f: return json.load(f)

# Query set identity. The fingerprint is what detects a denominator change
# wearing a delta's clothes.
cfg = load(os.path.join(CHECK, "clients.json"))["clients"][client]
queries = cfg["queries"]
fingerprint = hashlib.sha256(json.dumps(queries, sort_keys=True).encode()).hexdigest()[:12]
stages = {k: len(v) for k, v in (cfg.get("_stages") or {}).items()}

# Every manifest that names this client, newest first.
all_ids = []
for p in glob.glob(manifest_path("*")):
    rid = re.sub(r".*manifest-(.*)\.json$", r"\1", p)
    try: m = load(p)
    except Exception: continue
    if client not in (m.get("cells") or {}): continue
    if not os.path.exists(archive_path(rid)): continue
    all_ids.append((rid, m))
all_ids.sort(key=lambda t: t[0], reverse=True)

def eligible(m):
    """A run that can back a comparison. A carried record is a copy of an
    earlier day's answer, not a measurement of today, and the results file
    alone cannot reveal that. The shared 06:00 job produces carried runs for
    this client daily, so this filter is load-bearing rather than defensive."""
    if (m.get("carried") or {}).get(client, 0) != 0: return False
    if m.get("engines_carried_forward"): return False
    if sorted(m.get("engines_requested") or []) != sorted(engines): return False
    return True

if target == "NEWEST":
    picked = [(r, m) for r, m in all_ids if eligible(m)]
    if not picked:
        print(json.dumps({"error": "no comparison-eligible run in the archive"})); sys.exit(0)
    target = picked[0][0]

tm = dict(all_ids).get(target)
if tm is None:
    print(json.dumps({"error": "no manifest for run %s" % target})); sys.exit(0)

prev = None
for rid, m in all_ids:
    if rid >= target: continue
    if eligible(m) and (m.get("cells") or {}).get(client) == (tm.get("cells") or {}).get(client):
        prev = rid
        break

BUCKETS = ("cells", "measured", "populated", "cited_nothing", "no_answer_surface", "failed")

def summarize(rid):
    recs = load(archive_path(rid))
    per, dom, failed, owned = {}, collections.Counter(), [], []
    cellmap = {}
    for r in recs:
        e, slug = r["engine"], r["slug"]
        key = e + "/" + slug
        p = per.setdefault(e, dict.fromkeys(BUCKETS, 0))
        p["cells"] += 1
        if not r.get("measured"):
            p["failed"] += 1; failed.append(key); cellmap[key] = "failed"; continue
        p["measured"] += 1
        ds = r.get("all_cited_domains") or []
        # Google AI Overviews carries ai_overview_present. A successful SERP call
        # with no overview on it is not the engine declining to cite, it is the
        # answer surface not existing for that query. Folding the two together
        # inflates cited_nothing and hides that the real AI Overviews denominator
        # is tiny. docs/19 section 3.3 requires this denominator by hand.
        if "ai_overview_present" in r and not r.get("ai_overview_present"):
            p["no_answer_surface"] += 1; cellmap[key] = "no_answer_surface"; continue
        if ds:
            p["populated"] += 1; cellmap[key] = "populated"
        else:
            p["cited_nothing"] += 1; cellmap[key] = "cited_nothing"
        for d in ds: dom[d] += 1
        if r.get("owned_citations", 0) > 0:
            owned.append(dict(engine=e, slug=slug, query=r.get("query"), urls=r.get("cited_urls") or []))
    tot = {k: sum(p[k] for p in per.values()) for k in BUCKETS}
    slots = sum(dom.values())
    top = [dict(domain=k, cells=v) for k, v in sorted(dom.items(), key=lambda kv: (-kv[1], kv[0]))[:10]]
    return dict(
        run_id=rid, per_engine=per, totals=tot,
        failed_cells=sorted(failed), owned_citations=owned,
        distinct_domains=len(dom), domain_slots_filled=slots,
        domains_cited_exactly_once=sum(1 for v in dom.values() if v == 1),
        top_ten=top,
        top_ten_share=round(sum(t["cells"] for t in top) / slots, 4) if slots else None,
        _cellmap=cellmap, _domains=dict(dom),
    )

def cited_sets(rid):
    out = {}
    for r in load(archive_path(rid)):
        out[r["engine"] + "/" + r["slug"]] = set(r.get("all_cited_domains") or [])
    return out

cur = summarize(target)
out = dict(
    query_set=dict(query_count=len(queries), cells_per_full_run=len(queries) * len(engines),
                   fingerprint_sha256_12=fingerprint, stages=stages),
    run_of_record=dict(
        run_id=target, date_stamp=tm.get("date_stamp"),
        engines_requested=tm.get("engines_requested"),
        engines_carried_forward=tm.get("engines_carried_forward"),
        carried=(tm.get("carried") or {}).get(client),
        cells=(tm.get("cells") or {}).get(client),
        measured=(tm.get("measured") or {}).get(client),
        cost_usd=tm.get("cost_usd"),
        summary=cur,
    ),
    prior_run=None, comparison=None,
    eligible_runs=[r for r, m in all_ids if eligible(m)],
    ineligible_runs=[dict(run_id=r,
                          carried=(m.get("carried") or {}).get(client),
                          carried_forward=m.get("engines_carried_forward"),
                          engines=m.get("engines_requested"))
                     for r, m in all_ids if not eligible(m)],
)

if prev:
    pm = dict(all_ids)[prev]
    pre = summarize(prev)
    out["prior_run"] = dict(
        run_id=prev, date_stamp=pm.get("date_stamp"),
        engines_requested=pm.get("engines_requested"),
        engines_carried_forward=pm.get("engines_carried_forward"),
        carried=(pm.get("carried") or {}).get(client),
        cells=(pm.get("cells") or {}).get(client),
        measured=(pm.get("measured") or {}).get(client),
        cost_usd=pm.get("cost_usd"),
        summary=pre,
    )
    a, b = cited_sets(prev), cited_sets(target)
    keys = sorted(set(a) & set(b))
    cited_match = sum(1 for k in keys if bool(a[k]) == bool(b[k]))
    flips = []
    for k in keys:
        sa = pre["_cellmap"].get(k); sb = cur["_cellmap"].get(k)
        if sa != sb: flips.append(dict(cell=k, was=sa, now=sb))
    ov = []
    for k in keys:
        if a[k] or b[k]:
            ov.append(len(a[k] & b[k]) / float(len(a[k] | b[k])))
    pd_, cd_ = pre["_domains"], cur["_domains"]
    out["comparison"] = dict(
        pair=[prev, target],
        cited_or_not=dict(cells_matched=cited_match, cells_total=len(keys),
                          flips=len(keys) - cited_match),
        answer_state_flips=flips,
        source_set_churn=dict(
            cells_cited_in_either_run=len(ov),
            mean_jaccard_overlap=round(sum(ov) / len(ov), 4) if ov else None,
            identical_sets=sum(1 for x in ov if x == 1.0),
            disjoint_sets=sum(1 for x in ov if x == 0.0)),
        domains_entered=sorted(set(cd_) - set(pd_))[:40],
        domains_exited=sorted(set(pd_) - set(cd_))[:40],
        domains_entered_count=len(set(cd_) - set(pd_)),
        domains_exited_count=len(set(pd_) - set(cd_)),
    )

for blk in (out["run_of_record"], out["prior_run"]):
    if blk:
        blk["summary"].pop("_cellmap", None); blk["summary"].pop("_domains", None)

print(json.dumps(out, indent=1))
PYEOF
AN_RC=$?
set -e
[ "$AN_RC" -eq 0 ] || fail "analysis failed on $VIS_SSH_HOST:
$(cat "$TMPDIR_RUN/analysis.err")" 6
[ -s "$ANALYSIS" ] || fail "analysis produced nothing" 6

if python3 -c 'import json,sys; sys.exit(0 if json.load(open(sys.argv[1])).get("error") else 1)' "$ANALYSIS"; then
  fail "analysis error: $(python3 -c 'import json,sys;print(json.load(open(sys.argv[1]))["error"])' "$ANALYSIS")" 6
fi

# ------------------------------------------------------------- manifest gate
say "manifest gate"
GATE="$(python3 - "$ANALYSIS" "$STATE_FILE" <<'PYEOF'
import json, os, sys
a = json.load(open(sys.argv[1]))
state = {}
if os.path.exists(sys.argv[2]):
    try: state = json.load(open(sys.argv[2]))
    except Exception: state = {}
r = a["run_of_record"]
problems = []
if r.get("carried"): problems.append("carried=%s cells in run %s" % (r["carried"], r["run_id"]))
if r.get("engines_carried_forward"):
    problems.append("engines carried forward: %s" % r["engines_carried_forward"])
prev_fp = ((state.get("query_set") or {}).get("fingerprint_sha256_12"))
now_fp = a["query_set"]["fingerprint_sha256_12"]
if prev_fp and prev_fp != now_fp:
    problems.append("query set fingerprint changed %s -> %s" % (prev_fp, now_fp))
prev_cells = ((state.get("query_set") or {}).get("cells_per_full_run"))
if prev_cells and r.get("cells") and prev_cells != r["cells"]:
    problems.append("cell count changed %s -> %s" % (prev_cells, r["cells"]))
print("\n".join(problems) if problems else "OK")
PYEOF
)"
if [ "$GATE" != "OK" ]; then
  fail "manifest gate refused this run:
$GATE

A carried record is a copy of an earlier day's answer, not a measurement of today,
and a results file alone cannot reveal that. A changed cell count or fingerprint
means the denominator moved and every target and comparison is void until restated.
State was not updated. Nothing downstream may compare against this run." 5
fi
say "manifest gate ok: nothing carried forward, denominator unchanged"

# ------------------------------------------------------------- update state
say "updating state"
python3 - "$ANALYSIS" "$STATE_FILE" "$STARTED_AT" "$MODE" "$RUN_ID" "$PROBE_RC" <<'PYEOF' || exit 6
import json, os, sys, tempfile, datetime

analysis, state_path, started_at, mode = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
this_run_id, probe_rc = sys.argv[5], sys.argv[6]
a = json.load(open(analysis))

SKELETON = {
    "schema_version": "1.0.0",
    "state_readme": ".claude/state/README.md",
    "_ownership": {
        "measurement_block": "scripts/visibility-run.sh writes query_set, run_of_record, prior_run, comparison, position, competitor_distribution, spend.",
        "decision_block": "visibility-director writes director, open_items, pending_confirmation, terminated_findings, next_action.",
        "unknown_convention": "A fact that has not been measured is null with a sibling *_reason string. Never a zero, never a guess.",
    },
    "director": {"last_mode": None,
                 "last_mode_reason": "No director cycle recorded. Do not read null as OBSERVE.",
                 "last_decision": None, "last_rule_fired": None,
                 "last_run_id_read": None, "last_cycle_at": None,
                 "cycles_ending_in_observe_consecutively": 0},
    "open_items": {"analyses_outstanding": [], "briefs_written_not_shipped": [],
                   "changes_gated_not_merged": [], "escalations_open": [],
                   "escalations_answered": [], "documentation_drift": []},
    "pending_confirmation": [], "terminated_findings": [],
    "next_action": {"action": None, "trigger": None, "blocked_by": None},
}

# Re-read immediately before writing. Another writer may have touched the
# decision block since this cycle started, and a whole-file overwrite from a
# stale read destroys their work invisibly, because the file still parses.
state = {}
if os.path.exists(state_path):
    try: state = json.load(open(state_path))
    except Exception as e:
        sys.stderr.write("state file is not valid JSON, refusing to overwrite: %s\n" % e); sys.exit(1)
for k, v in SKELETON.items():
    state.setdefault(k, v)

def block(src):
    if not src: return None
    s = src["summary"]
    return {
        "run_id": src["run_id"], "date_stamp": src["date_stamp"],
        "archive": "ultra:~/claudecode/total-search-dashboard/checker/history/runs/hendricks-%s.json" % src["run_id"],
        "manifest": "ultra:~/claudecode/total-search-dashboard/checker/history/runs/manifest-%s.json" % src["run_id"],
        "engines_requested": src["engines_requested"],
        "engines_carried_forward": src["engines_carried_forward"],
        "carried": src["carried"], "cells": src["cells"], "measured": src["measured"],
        "failed": s["totals"]["failed"], "cost_usd": src["cost_usd"],
        # Only this script's own cycle observed an exit code. Every other run,
        # including anything reconstructed by --rebuild-state, was measured by
        # something that did not record one, and the manifest does not carry it.
        # An inference from the run-health gate is not a record, so it is null
        # with a reason, per the unknown convention in _ownership.
        "probe_exit_code": (int(probe_rc) if (probe_rc != "" and src["run_id"] == this_run_id) else None),
        "probe_exit_code_reason": (None if (probe_rc != "" and src["run_id"] == this_run_id)
            else "Not recorded. The manifest carries no exit code and this run was not measured by this script, so nothing observed it. Inferable as 0 from the run-health gate, which exits 1 under half measured and 2 at zero. An inference is not a record."),
        "comparison_safe": True,
        "comparison_safe_basis": "carried is 0, engines_carried_forward is empty, cells matches the prior run, and the query set fingerprint is unchanged. Probe exit code is not part of this basis unless this script observed the run itself.",
        "answer_state": {
            "_definition": "Four buckets, never folded. populated means the engine answered and cited at least one source. cited_nothing means the engine answered and cited none. no_answer_surface means the probe succeeded but the engine produced no answer surface at all, which on Google AI Overviews means no overview was returned for that query. failed means the probe did not return a measurement.",
            "_denominator_rule": "The operative denominator for a citation question is populated plus cited_nothing. no_answer_surface and failed cells cannot cite anyone and must never be counted as losses.",
            "totals": s["totals"], "per_engine": s["per_engine"],
            "failed_cells": s["failed_cells"],
            "per_cell_source_of_truth": "The archive. State carries counts plus the failed-cell list.",
        },
    }

ror, prior = a["run_of_record"], a.get("prior_run")
s = ror["summary"]

qs = state.setdefault("query_set", {})
qs.update({"client_key": "hendricks",
           "source": "ultra:~/claudecode/total-search-dashboard/checker/clients.json",
           "query_count": a["query_set"]["query_count"],
           "cells_per_full_run": a["query_set"]["cells_per_full_run"],
           "fingerprint_sha256_12": a["query_set"]["fingerprint_sha256_12"],
           "stages": a["query_set"]["stages"]})

state["run_of_record"] = block(ror)
state["prior_run"] = block(prior) if prior else None
if not prior:
    state["prior_run_reason"] = "No earlier comparison-eligible run of this query set exists in the archive."

owned = s["owned_citations"]
pos = state.setdefault("position", {})
answering = s["totals"]["populated"] + s["totals"]["cited_nothing"]
pos.update({
    "owned_domain": "hendricks.ai",
    "owned_cited_cells": len(owned),
    "denominator_cells": s["totals"]["cells"],
    "denominator_populated_cells": s["totals"]["populated"],
    "denominator_answering_cells": answering,
    "denominator_note": (
        "Three denominators, and a published figure must name which one it uses. %d is every cell. "
        "%d is cells where an engine produced an answer at all. %d is cells where an engine cited "
        "at least one source, which is the only denominator against which a citation share is "
        "meaningful." % (s["totals"]["cells"], answering, s["totals"]["populated"])),
    "as_of_run": ror["run_id"],
    "owned_cited_urls": [u for c in owned for u in c["urls"]],
    "owned_citation_cells": owned,
})
if not owned:
    pos["owned_url_http_checks"] = []
    pos["owned_url_http_checks_reason"] = "There are no owned citations to resolve."
    pos["statement"] = "hendricks.ai is cited in 0 of %d cells and 0 of the %d populated cells." % (
        s["totals"]["cells"], s["totals"]["populated"])
else:
    pos["owned_url_http_checks"] = None
    pos["owned_url_http_checks_reason"] = (
        "NOT YET CHECKED. An owned citation appeared in run %s. Resolving every owned cited URL "
        "is visibility-prober's job and it is the highest-priority Class A action in the program. "
        "A citation pointing at a non-200 converts a recommendation into a bad experience." % ror["run_id"])
    pos["statement"] = "hendricks.ai is cited in %d of %d cells and %d of the %d populated cells." % (
        len(owned), s["totals"]["cells"], len(owned), s["totals"]["populated"])

cd = state.setdefault("competitor_distribution", {})
slots = s["domain_slots_filled"]
cd.update({
    "as_of_run": ror["run_id"], "distinct_domains": s["distinct_domains"],
    "domain_slots_filled": slots, "domains_cited_exactly_once": s["domains_cited_exactly_once"],
    "share_cited_exactly_once": round(s["domains_cited_exactly_once"] / float(s["distinct_domains"]), 3) if s["distinct_domains"] else None,
    "top_ten_share_of_slots": s["top_ten_share"], "top_ten": s["top_ten"],
    "tie_note": "Ranks tied on cell count are ordered alphabetically. Movement inside a tie is a sorting artifact.",
    "falsification_watch": "docs/19 section 8.2 fails the plan if this head consolidates.",
})

if a.get("comparison"):
    c = a["comparison"]
    aio_only = all(f["cell"].startswith("google_aio/") for f in c["answer_state_flips"]) if c["answer_state_flips"] else True
    co = dict(c["cited_or_not"])
    co["reading"] = (
        "Whether an engine cites anyone at all did not move on a single cell. This is the Class A "
        "stability that lets one run be enough to call a state change."
        if co["flips"] == 0 else
        "%d cell(s) changed on whether the engine cited anyone at all. That state was perfectly stable "
        "across a same-day repeat, so a flip here is signal on one run and needs an explanation."
        % co["flips"])
    old_cmp = state.get("comparison") or {}
    state["comparison"] = {
        "pair": c["pair"], "eligible": True,
        "eligibility_basis": "Both manifests carried 0, both requested the same engines, both are the same cell count, and the query set fingerprint did not change between them.",
        "cited_or_not": co,
        "answer_state_flips": {
            "count": len(c["answer_state_flips"]), "flips": c["answer_state_flips"],
            "all_on_google_aio": aio_only,
            "reading": ("Every flip is a Google AI Overviews probe succeeding or failing, not an engine changing its citation behaviour. Judge AI Overviews on the failure count, not cell by cell."
                        if aio_only else
                        "At least one flip is outside Google AI Overviews. That is a Class A signal and it needs an explanation."),
            "caution": (
                "A literal reading of the Class A rule, which names movement into or out of failed, fires "
                "%d times on this pair. It should fire zero times. Every one of these cells moved between "
                "failed and no_answer_surface, so none of them was ever a cell where anything was cited. "
                "The correct unit is the cited-or-not state, and that did not move."
                % len(c["answer_state_flips"]))
            if aio_only and c["answer_state_flips"] and all(
                {f["was"], f["now"]} <= {"failed", "no_answer_surface"} for f in c["answer_state_flips"])
            else None,
        },
        "source_set_churn": dict(c["source_set_churn"],
            reading="Measured churn floor with nothing changed is a mean overlap near 0.68. Any Class B claim smaller than this is noise."),
        "domains_entered_count": c["domains_entered_count"],
        "domains_exited_count": c["domains_exited_count"],
        "domains_entered_sample": c["domains_entered"],
        "domains_exited_sample": c["domains_exited"],
    }
    # Narrative a human added about THIS pair survives a rebuild of the same
    # pair, and is deliberately dropped when the pair changes. A warning label
    # written about one pair is wrong on the next one.
    if old_cmp.get("pair") == c["pair"]:
        for k, v in old_cmp.items():
            state["comparison"].setdefault(k, v)
else:
    state["comparison"] = {"pair": None, "eligible": False,
        "eligibility_basis": "No earlier comparison-eligible run of this query set exists in the archive."}

sp = state.setdefault("spend", {})
cost = ror.get("cost_usd") or 0.0
today = ror.get("date_stamp")
if mode == "cycle":
    if sp.get("program_spend_today_date") == today:
        sp["program_runs_today"] = (sp.get("program_runs_today") or 0) + 1
        sp["program_spend_today"] = round((sp.get("program_spend_today") or 0.0) + cost, 4)
    else:
        sp["program_runs_today"] = 1
        sp["program_spend_today"] = cost
        sp["program_spend_today_date"] = today
    sp["program_spend_cycle"] = round((sp.get("program_spend_cycle") or 0.0) + cost, 4)
sp.setdefault("currency", "USD")
cr = sp.setdefault("cost_reference", {})
cr.update({
    "full_three_engine_17_queries_dry_run_estimate": 1.33,
    "estimator_bias": "The dry-run estimate has run roughly 3.5 times the billed amount. Ceiling guard, never a forecast.",
})
if cost:
    cr["full_three_engine_17_queries_actual"] = cost

state["state_updated_at"] = datetime.datetime.now().astimezone().isoformat(timespec="seconds")
state["state_updated_by"] = "visibility-run.sh"
state["last_cycle"] = {"started_at": started_at, "mode": mode, "run_id": ror["run_id"],
                       "ineligible_runs_skipped": a.get("ineligible_runs", [])}

# Atomic. A reader must never see a half-written state file.
d = os.path.dirname(os.path.abspath(state_path))
fd, tmp = tempfile.mkstemp(dir=d, prefix=".visibility-state.", suffix=".tmp")
with os.fdopen(fd, "w") as f:
    json.dump(state, f, indent=2); f.write("\n")
# mkstemp creates 0600. This file is version-controlled alongside the site and
# read by anyone working in the repo, so it gets normal file permissions.
os.chmod(tmp, 0o644)
os.replace(tmp, state_path)
print("state updated: run_of_record=%s owned=%d/%d populated=%d" % (
    ror["run_id"], len(owned), s["totals"]["cells"], s["totals"]["populated"]))
PYEOF
say "state written"

# ------------------------------------------------------------------- report
mkdir -p "$REPORT_DIR"
REPORT_RUN_ID="$(python3 -c 'import json,sys;print(json.load(open(sys.argv[1]))["run_of_record"]["run_id"])' "$ANALYSIS")"
REPORT="$REPORT_DIR/$REPORT_RUN_ID.md"
say "writing report $REPORT"
python3 - "$ANALYSIS" "$REPORT" "$STARTED_AT" "$MODE" "$LOG_FILE" <<'PYEOF' || exit 6
import json, sys, datetime
a = json.load(open(sys.argv[1]))
out, started, mode, logf = sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5]
r, p, c = a["run_of_record"], a.get("prior_run"), a.get("comparison")
s = r["summary"]
L = []
w = L.append
w("# Visibility cycle %s" % r["run_id"])
w("")
w("Written by `scripts/visibility-run.sh`, mode `%s`, started %s. Log: `%s`." % (mode, started, logf))
w("")
w("This is a machine cycle report. The record of truth for every figure below is the")
w("immutable archive and manifest for this run id under")
w("`ultra:~/claudecode/total-search-dashboard/checker/history/runs/`, which is never pruned.")
w("`docs/measurement/visibility-runs.md` is the human-readable ledger and stays the single")
w("one, but it does not exist yet. Tracked as documentation drift DD2 in state.")
w("")
w("## 1. Run of record")
w("")
w("| Field | Value |")
w("|---|---:|")
w("| Run id | %s |" % r["run_id"])
w("| Date | %s |" % r["date_stamp"])
w("| Engines | %s |" % ", ".join(r["engines_requested"] or []))
w("| Carried forward | %s |" % (r["engines_carried_forward"] or "none"))
w("| Cells | %s |" % r["cells"])
w("| Measured | %s |" % r["measured"])
w("| Failed | %s |" % s["totals"]["failed"])
w("| Billed | $%s |" % r["cost_usd"])
w("")
w("## 2. Position")
w("")
owned = s["owned_citations"]
w("hendricks.ai is cited in %d of %d cells, and %d of the %d cells where the engine cited anything at all."
  % (len(owned), s["totals"]["cells"], len(owned), s["totals"]["populated"]))
w("")
if owned:
    w("Owned citations this run:")
    w("")
    for o in owned:
        w("- %s, `%s`, %s" % (o["engine"], o["slug"], ", ".join(o["urls"])))
    w("")
    w("ACTION REQUIRED. Every owned cited URL must be resolved before this is reported anywhere.")
    w("An owned citation returning anything other than 200 is the highest-priority event in this")
    w("program. That check is `visibility-prober`'s and it has not run.")
else:
    w("No owned citations, so there is nothing to resolve.")
w("")
w("## 3. Answer state, four buckets")
w("")
w("| Engine | Cells | Populated | Cited nothing | No answer surface | Failed |")
w("|---|---:|---:|---:|---:|---:|")
for e in ("perplexity", "chat_gpt", "google_aio"):
    if e in s["per_engine"]:
        x = s["per_engine"][e]
        w("| %s | %d | %d | %d | %d | %d |" % (e, x["cells"], x["populated"], x["cited_nothing"],
                                               x["no_answer_surface"], x["failed"]))
t = s["totals"]
w("| **total** | %d | %d | %d | %d | %d |" % (t["cells"], t["populated"], t["cited_nothing"],
                                              t["no_answer_surface"], t["failed"]))
w("")
w("The operative denominator for a citation question is %d, populated plus cited nothing, not %d."
  % (t["populated"] + t["cited_nothing"], t["cells"]))
w("A cell with no answer surface and a failed cell cannot cite anyone, so neither is a loss.")
if t["no_answer_surface"]:
    w("")
    w("%d cells returned no answer surface. On Google AI Overviews that means Google produced no"
      % t["no_answer_surface"])
    w("overview for the query at all, which is a different fact from an overview that cited nobody,")
    w("and folding the two together would overstate the competitive problem.")
w("")
w("## 4. Comparison")
w("")
if not c:
    w("No comparison. There is no earlier comparison-eligible run of this query set in the archive.")
    w("A first run establishes a position. It cannot establish a change.")
else:
    w("Pair: `%s` then `%s`." % (c["pair"][0], c["pair"][1]))
    w("")
    co = c["cited_or_not"]
    w("Cited or not, the stable reading: %d of %d cells matched, %d flipped."
      % (co["cells_matched"], co["cells_total"], co["flips"]))
    fl = c["answer_state_flips"]
    aio = [f for f in fl if f["cell"].startswith("google_aio/")]
    w("")
    w("Answer state flips: %d, of which %d are Google AI Overviews probe failures." % (len(fl), len(aio)))
    for f in fl:
        w("- `%s`: %s to %s" % (f["cell"], f["was"], f["now"]))
    if fl and len(aio) == len(fl):
        w("")
        w("All of them are the AI Overviews probe succeeding or failing. None changed whether")
        w("anything was cited. Read this as instrument noise on the count, not as movement.")
    elif fl:
        w("")
        w("At least one flip is outside Google AI Overviews. That is a Class A signal and it needs")
        w("an explanation before this cycle closes.")
    ch = c["source_set_churn"]
    w("")
    w("Source-set churn: mean overlap %s across %s cells cited in either run, %s identical, %s disjoint."
      % (ch["mean_jaccard_overlap"], ch["cells_cited_in_either_run"], ch["identical_sets"], ch["disjoint_sets"]))
    w("The measured floor with nothing changed is about 0.68. Anything smaller than that is noise,")
    w("and a domain appearing in one run and not the next is the null result.")
    w("")
    w("Domains entered: %d. Domains exited: %d. Both are Class B and neither is a finding until"
      % (c["domains_entered_count"], c["domains_exited_count"]))
    w("it holds across two consecutive runs.")
w("")
w("## 5. Competitor distribution")
w("")
w("%d distinct domains filled %d slots. %d were cited exactly once. The top ten hold %s of slots."
  % (s["distinct_domains"], s["domain_slots_filled"], s["domains_cited_exactly_once"],
     ("%.1f percent" % (s["top_ten_share"] * 100)) if s["top_ten_share"] else "an unknown share"))
w("")
w("| Domain | Cells |")
w("|---|---:|")
for d in s["top_ten"]:
    w("| %s | %d |" % (d["domain"], d["cells"]))
w("")
w("Ranks tied on cell count are ordered alphabetically. Movement inside a tie is a sorting artifact.")
w("")
w("## 6. Runs the gate refused")
w("")
bad = a.get("ineligible_runs") or []
if not bad:
    w("None.")
else:
    w("These archived runs exist and cannot back a comparison:")
    w("")
    for b in bad[:12]:
        w("- `%s`: carried %s, carried forward %s, engines %s"
          % (b["run_id"], b["carried"], b["carried_forward"] or "none", b["engines"]))
    w("")
    w("The shared 06:00 job on the Ultra runs this client daily with carry-forward on, so these")
    w("accumulate. They are archived measurements of a different shape, not comparison material.")
w("")
w("## 7. What this cycle did not do")
w("")
w("It did not publish, merge, deploy, post off-site, or edit any site copy. It wrote two paths,")
w("both under `.claude/state/`. Anything in this report that should reach a page needs a human,")
w("and needs to pass `evidence-checker` first.")
w("")
open(out, "w").write("\n".join(L) + "\n")
print("report written: %s" % out)
PYEOF

# ------------------------------------------------------------------- closing
rule
say "cycle complete"
say "run of record : $REPORT_RUN_ID"
say "state         : $STATE_FILE"
say "report        : $REPORT"
say "log           : $LOG_FILE"
rule
say "paths this cycle touched in the repo:"
git -C "$VIS_REPO" status --short -- .claude/state 2>/dev/null || true
say ""
say "Nothing was published. A human decides what, if anything, reaches the site."
exit 0
