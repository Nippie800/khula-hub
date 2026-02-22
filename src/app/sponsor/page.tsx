import Container from "../../components/Container";
import PrimaryButton from "../../components/PrimaryButton";

export default function SponsorPage() {
  return (
    <main className="py-10">
      <Container>
        <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Sponsor a learner</h1>
          <p className="mt-2 text-sm text-gray-700">
            Sponsorship flow will go live on Day 2. For now, please contact Khula NPC for sponsorship options.
          </p>
          <div className="mt-6">
            <PrimaryButton href="/">Back to home</PrimaryButton>
          </div>
        </div>
      </Container>
    </main>
  );
}