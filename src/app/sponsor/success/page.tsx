"use client";

import { useSearchParams } from "next/navigation";
import Container from "../../../components/Container";
import PrimaryButton from "../../../components/PrimaryButton";
import { EFT } from "../../../lib/constants";

function parseAmountToNumber(input: string): number | null {
  const s = (input || "").toLowerCase().trim();
  if (!s) return null;
  if (s.includes("full")) return null;
  const cleaned = s.replace(/[^0-9.]/g, "");
  if (!cleaned) return null;
  const n = Number(cleaned);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

function ImpactBar({ pct }: { pct: number }) {
  const blocks = 12;
  const filled = Math.round((pct / 100) * blocks);
  const bar = "█".repeat(Math.max(0, Math.min(blocks, filled))) + "░".repeat(Math.max(0, blocks - filled));

  return (
    <div className="mt-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
      <div className="text-sm font-semibold text-gray-900">🌱 Your sponsorship helps build</div>
      <div className="mt-2 font-mono text-sm text-gray-800 select-none">{bar}</div>
      <div className="mt-2 text-sm text-gray-700">{pct}% of a full ticket</div>
    </div>
  );
}

export default function SponsorSuccessPage() {
  const sp = useSearchParams();
  const ref = sp.get("ref") ?? "SPONSOR-YYYY-XXXX";
  const amountStr = sp.get("amount") ?? "";

  // full ticket price from env (simple + editable without code)
  const FULL_TICKET_ZAR = Number(process.env.NEXT_PUBLIC_FULL_TICKET_ZAR ?? 1200);

  const parsed = parseAmountToNumber(amountStr);

  const pct = (() => {
    // "Full ticket" → 100%
    if (amountStr.toLowerCase().includes("full")) return 100;

    // numeric amount → percent
    if (parsed != null) return Math.max(1, Math.min(100, Math.round((parsed / Math.max(1, FULL_TICKET_ZAR)) * 100)));

    // unknown → show 0 (still friendly)
    return 0;
  })();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* themed header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-teal-600 to-lime-300" />
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-blue-800/40 blur-3xl" />
        <div className="absolute right-[-180px] top-[-160px] h-[520px] w-[520px] rounded-full bg-lime-300/35 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/10" />

        <Container>
          <div className="relative py-10 sm:py-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                🎁 Sponsor Confirmed
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                You just helped build someone’s future.
              </h1>

              <p className="mt-2 text-sm text-white/90">
                Brick by brick — thank you. Use the EFT reference below when making payment.
                <span className="block mt-2 font-semibold text-white/85">See you around the fire. 🔥</span>
              </p>
            </div>
          </div>
        </Container>

        <div className="h-10 w-full bg-gradient-to-b from-transparent to-slate-50" />
      </section>

      <Container>
        <div className="py-8">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* ref */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs text-gray-600">EFT Reference</p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">{ref}</p>
              <p className="mt-2 text-sm text-gray-700">{EFT.referenceHelp}</p>
              {amountStr ? (
                <p className="mt-3 text-xs text-gray-600">Pledge noted: <b>{amountStr}</b></p>
              ) : null}
            </div>

            {/* impact visualization */}
            <ImpactBar pct={pct} />

            {/* banking */}
            <div className="mt-6 rounded-2xl border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900">EFT Banking Details</h2>
              <div className="mt-3 grid gap-2 text-sm text-gray-800">
                <p><b>Bank:</b> {EFT.bankName}</p>
                <p><b>Account name:</b> {EFT.accountName}</p>
                <p><b>Account number:</b> {EFT.accountNumber}</p>
                <p><b>Branch code:</b> {EFT.branchCode}</p>
                <p><b>Amount:</b> {EFT.amount}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryButton href="/">Back to home</PrimaryButton>
              <PrimaryButton href="/sponsor">Sponsor another learner</PrimaryButton>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}