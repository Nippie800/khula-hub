import Container from "../../../components/Container";
import PrimaryButton from "../../../components/PrimaryButton";
import { EFT } from "../../../lib/constants";

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { ref?: string };
}) {
  const ref = searchParams?.ref ?? "KHULA-YYYY-XXXX";

  return (
    <main className="py-10">
      <Container>
        <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Registration received ✅</h1>
          <p className="mt-1 text-sm text-gray-700">
            Thank you. Your registration reference is:
          </p>

          <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-600">EFT Reference</p>
            <p className="mt-1 text-2xl font-bold tracking-tight">{ref}</p>
            <p className="mt-2 text-sm text-gray-700">{EFT.referenceHelp}</p>
          </div>

          <div className="mt-6 rounded-2xl border border-gray-200 p-4">
            <h2 className="text-lg font-semibold">EFT Banking Details</h2>
            <div className="mt-3 grid gap-2 text-sm text-gray-800">
              <p><b>Bank:</b> {EFT.bankName}</p>
              <p><b>Account name:</b> {EFT.accountName}</p>
              <p><b>Account number:</b> {EFT.accountNumber}</p>
              <p><b>Branch code:</b> {EFT.branchCode}</p>
              <p><b>Amount:</b> {EFT.amount}</p>
            </div>

            <p className="mt-4 text-sm text-gray-700">
              After payment, keep your proof of payment. (A proof upload step can be added next.)
            </p>
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