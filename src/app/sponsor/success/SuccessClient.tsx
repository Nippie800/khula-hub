"use client";

import { useSearchParams } from "next/navigation";
import Container from "../../../components/Container";
import PrimaryButton from "../../../components/PrimaryButton";
import { EFT, CAMP } from "../../../lib/constants";
import { useMemo } from "react";

function GeometricOverlay() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-30"
      viewBox="0 0 1200 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="glassA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.10" />
          <stop offset="1" stopColor="white" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="glassB" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.08" />
          <stop offset="1" stopColor="white" stopOpacity="0.01" />
        </linearGradient>
      </defs>

      <polygon points="0,80 420,0 560,0 160,240" fill="url(#glassA)" />
      <polygon points="140,560 560,260 720,340 320,600" fill="url(#glassB)" />
      <polygon points="760,0 1200,0 1200,260 980,240" fill="url(#glassA)" />
      <polygon points="620,600 860,420 1200,540 1200,600" fill="url(#glassB)" />
      <polyline points="0,120 460,0" fill="none" stroke="white" strokeOpacity="0.18" strokeWidth="2" />
      <polyline points="220,600 650,300" fill="none" stroke="white" strokeOpacity="0.16" strokeWidth="2" />
      <polyline points="820,0 1200,220" fill="none" stroke="white" strokeOpacity="0.14" strokeWidth="2" />
    </svg>
  );
}

function ImpactBar({ pct }: { pct: number }) {
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
        <span>🌱 Sponsor impact</span>
        <span>{clamped}%</span>
      </div>
      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-teal-600 to-lime-400"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-gray-600">
        Your sponsorship helps build a full ticket — brick by brick.
      </p>
    </div>
  );
}

export default function SponsorSuccessClient() {
  const sp = useSearchParams();
  const ref = sp.get("ref") ?? "SPONSOR-YYYY-XXXX";

  // Optional: if you later pass ?amount=500 and CAMP.ticketPrice exists
  const pct = useMemo(() => {
    const raw = sp.get("amount");
    const amount = raw ? Number(String(raw).replace(/[^\d.]/g, "")) : NaN;

    // If you have a numeric ticket price in CAMP, use it. Otherwise fallback.
    const ticket = (CAMP as any)?.ticketPrice;
    const ticketPrice = typeof ticket === "number" && ticket > 0 ? ticket : null;

    if (!ticketPrice || !Number.isFinite(amount) || amount <= 0) return 45; // default nice demo
    return Math.round((amount / ticketPrice) * 100);
  }, [sp]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Themed header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-teal-600 to-lime-300" />
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-blue-800/40 blur-3xl" />
        <div className="absolute right-[-180px] top-[-160px] h-[520px] w-[520px] rounded-full bg-lime-300/35 blur-3xl" />
        <GeometricOverlay />
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/10" />

        <Container>
          <div className="relative py-10 sm:py-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                🎁 Sponsor Journey
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                See you around the fire.
              </h1>

              <p className="mt-2 text-sm text-white/90">
                Your sponsorship pledge is saved. Use the EFT reference below to complete the payment.
              </p>
            </div>
          </div>
        </Container>

        <div className="h-10 w-full bg-gradient-to-b from-transparent to-slate-50" />
      </section>

      <Container>
        <div className="py-8">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Reference */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs text-gray-600">EFT Reference</p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">{ref}</p>
              <p className="mt-2 text-sm text-gray-700">{EFT.referenceHelp}</p>

              <ImpactBar pct={pct} />
            </div>

            {/* Banking details */}
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