import { cookies } from "next/headers";
import { Gate } from "./components/gate/Gate";
import { HomePage } from "./components/site/HomePage";
import { ENTERED_COOKIE } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function Page({
  searchParams,
}: {
  searchParams?: { gate?: string };
}) {
  const forceGate = searchParams?.gate === "1";
  const entered = cookies().get(ENTERED_COOKIE)?.value === "1";

  if (!forceGate && entered) {
    return <HomePage />;
  }

  return <Gate />;
}
