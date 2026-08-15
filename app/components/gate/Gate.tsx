"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import type { ProbeResult } from "@/lib/probe/types";
import { ProbeResults } from "./ProbeResults";

export function Gate() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ProbeResult | null>(null);

  async function enter() {
    await fetch("/api/enter", { method: "POST" });
    router.refresh();
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const response = await fetch("/api/probe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: value }),
      });
      const data = await response.json();
      if (!response.ok) {
        setResult(null);
        setError(typeof data.error === "string" ? data.error : "Type a website.");
        return;
      }
      setResult(data as ProbeResult);
    } catch {
      setResult(null);
      setError("The probe did not return. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className={`gate ${result ? "gate-open" : ""}`}>
      <button type="button" className="wordmark gate-mark" onClick={enter}>
        Hendricks
      </button>

      <form className="gate-form" onSubmit={onSubmit}>
        {!result && <p className="gate-line">Type your website.</p>}
        <div className="gate-bar">
          <input
            type="text"
            name="url"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            autoComplete="url"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Website"
            disabled={pending}
          />
          <button type="submit" className="gate-submit" disabled={pending || !value.trim()}>
            {pending ? "Reading" : "Read"}
          </button>
        </div>
        {error ? <p className="gate-error">{error}</p> : null}
        {pending && !result ? <p className="gate-quiet">Reading this URL.</p> : null}
      </form>

      {result ? <ProbeResults result={result} onEnter={enter} /> : null}
    </div>
  );
}
