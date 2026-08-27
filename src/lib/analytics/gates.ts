/**
 * Vendor load gates. Each tag has two independent locks: a real env ID, and
 * analytics consent. Either one missing means the script never enters the
 * document (docs/16 §2, §15 — basic consent mode, no cookieless ping).
 */

export function shouldLoadGa4({
  measurementId,
  analyticsGranted,
}: {
  measurementId: string | undefined
  analyticsGranted: boolean
}): boolean {
  return Boolean(measurementId) && analyticsGranted
}

export function shouldLoadLinkedInInsight({
  partnerId,
  analyticsGranted,
}: {
  partnerId: string | undefined
  analyticsGranted: boolean
}): boolean {
  return Boolean(partnerId) && analyticsGranted
}
