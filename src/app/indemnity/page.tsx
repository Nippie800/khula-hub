import Container from "../../components/Container";

export default function IndemnityPage() {
  return (
    <main className="py-10">
      <Container>
        <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Indemnity</h1>
          <p className="mt-2 text-sm text-gray-700">
            This is a placeholder. Khula NPC will provide final indemnity wording.
          </p>

          <div className="mt-6 space-y-3 text-sm text-gray-700">
            <p>
              By registering a learner, the parent/guardian acknowledges that participation in camp activities involves
              reasonable risk and agrees that Khula NPC and its representatives are not liable for loss, injury, or damage
              except where required by law.
            </p>
            <p>
              Parents/guardians confirm they have provided accurate medical/allergy information and emergency contact details.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}