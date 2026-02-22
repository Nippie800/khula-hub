import Container from "../../components/Container";

export default function TermsPage() {
  return (
    <main className="py-10">
      <Container>
        <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Terms & Conditions</h1>
          <p className="mt-2 text-sm text-gray-700">
            This is a placeholder. Khula NPC will provide final Ts&amp;Cs.
          </p>

          <div className="mt-6 space-y-3 text-sm text-gray-700">
            <p><b>1) Registration:</b> A learner is considered registered once the form is submitted and payment is received.</p>
            <p><b>2) Behaviour:</b> Learners are expected to respect leaders, peers, and camp rules.</p>
            <p><b>3) Refunds:</b> Refund policy to be confirmed by Khula NPC.</p>
            <p><b>4) Privacy:</b> Learner info is used only for camp operations and safety.</p>
          </div>
        </div>
      </Container>
    </main>
  );
}