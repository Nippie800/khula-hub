import { Suspense } from "react";
import SponsorSuccessClient from "./SuccessClient";

export default function SponsorSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-slate-50 to-white" />}>
      <SponsorSuccessClient />
    </Suspense>
  );
}