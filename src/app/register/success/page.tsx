"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Container from "../../../components/Container";
import PrimaryButton from "../../../components/PrimaryButton";
import { EFT } from "../../../lib/constants";

function StepItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      <p className="mt-1 text-sm text-gray-700">{desc}</p>
    </div>
  );
}

function SuccessInner() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") ?? "KHULA-YYYY-XXXX";

  const [copied, setCopied] = useState(false);

  async function copyRef() {
    try {
      await navigator.clipboard.writeText(ref);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Themed header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-teal-600 to-lime-300" />
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-blue-800/40 blur-3xl" />
        <div className="absolute right-[-180px] top-[-160px] h-[520px] w-[520px] rounded-full bg-lime-300/35 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/10" />

        <Container>
          <div className="relative py-10 sm:py-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                🔥 Welcome to camp
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Your spot by the fire is reserved.
              </h1>

              <p className="mt-2 text-sm text-white/90">
                Next step: make an EFT payment using the reference below (exactly as shown) so we can confirm the spot.
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

              <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                <p className="text-2xl font-bold tracking-tight text-gray-900">{ref}</p>

                <button
                  onClick={copyRef}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                  type="button"
                >
                  {copied ? "Copied ✅" : "Copy reference"}
                </button>
              </div>

              <p className="mt-2 text-sm text-gray-700">{EFT.referenceHelp}</p>
              <p className="mt-3 text-xs text-gray-600">
                🧱 Brick placed. Once payment is matched, admin will mark this registration as paid.
              </p>
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

            {/* Steps */}
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <StepItem title="1) Make EFT payment" desc="Pay using your banking app and include the reference exactly as shown." />
              <StepItem title="2) Keep proof of payment" desc="Save your POP/screenshot in case we need to verify quickly." />
              <StepItem title="3) Wait for confirmation" desc="An admin will match payment and mark the registration as paid." />
            </div>

            {/* CTA */}
            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryButton href="/">Back to home</PrimaryButton>
              <PrimaryButton href="/register">Register another learner</PrimaryButton>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
          <Container>
            <div className="py-10">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold text-gray-900">Loading your camp details…</div>
                <p className="mt-2 text-sm text-gray-700">Getting your EFT reference ready.</p>
              </div>
            </div>
          </Container>
        </main>
      }
    >
      <SuccessInner />
    </Suspense>
  );
}