"use client";

import { useSearchParams } from "next/navigation";
import Container from "../../../components/Container";
import PrimaryButton from "../../../components/PrimaryButton";
import { EFT } from "../../../lib/constants";
import { useState } from "react";

function StepItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      <p className="mt-1 text-sm text-gray-700">{desc}</p>
    </div>
  );
}

export default function SuccessPage() {
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
    <main className="py-10">
      <Container>
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Registration received ✅</h1>
          <p className="mt-1 text-sm text-gray-700">
            Your registration has been saved. Use the reference below when making EFT payment.
          </p>

          <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-600">EFT Reference</p>
            <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
              <p className="text-2xl font-bold tracking-tight">{ref}</p>
              <button
                onClick={copyRef}
                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                type="button"
              >
                {copied ? "Copied ✅" : "Copy reference"}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-700">{EFT.referenceHelp}</p>
          </div>

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

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <StepItem
              title="1) Make EFT payment"
              desc="Pay using your bank app and include the reference exactly as shown."
            />
            <StepItem
              title="2) Keep proof of payment"
              desc="Save your POP/screenshot in case we need to verify."
            />
            <StepItem
              title="3) Wait for confirmation"
              desc="An admin will match payment and mark the registration as paid."
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryButton href="/">Back to home</PrimaryButton>
            <PrimaryButton href="/register">Register another learner</PrimaryButton>
          </div>
        </div>
      </Container>
    </main>
  );
}