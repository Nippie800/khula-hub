import Container from "../components/Container";
import PrimaryButton from "../components/PrimaryButton";
import { CAMP } from "../lib/constants";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold text-gray-900">{children}</h2>;
}

export default function HomePage() {
  return (
    <main className="py-10">
      <Container>
        <div className="rounded-3xl border border-gray-200 p-8 shadow-sm">
          <p className="text-sm text-gray-600">{CAMP.name} (est. {CAMP.est})</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            {CAMP.slogan}
          </h1>
          <p className="mt-3 text-gray-700">{CAMP.themeLine}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryButton href="/register">Register a learner</PrimaryButton>
            <PrimaryButton href="/sponsor">Sponsor a learner</PrimaryButton>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-gray-50 p-5">
              <SectionTitle>Camp overview</SectionTitle>
              <p className="mt-2 text-sm text-gray-700">
                A Grade 8–11 camp focused on ownership, truth, and building a life that lasts — brick by brick.
              </p>
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-700">
                <li>Grade 8–11 learners</li>
                <li>Christian-based (not heavy)</li>
                <li>Character, leadership, and practical life-building</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5">
              <SectionTitle>Key details</SectionTitle>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                <li><b>Dates:</b> TBA</li>
                <li><b>Venue:</b> TBA</li>
                <li><b>Fee:</b> TBA</li>
                <li><b>Contact:</b> TBA</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5">
              <SectionTitle>Meet the team</SectionTitle>
              <p className="mt-2 text-sm text-gray-700">
                Representatives of Khula NPC (add names + short bios here).
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-3 text-sm">
                  <b>Representative 1</b>
                  <p className="text-gray-600">Short description (TBA)</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-3 text-sm">
                  <b>Representative 2</b>
                  <p className="text-gray-600">Short description (TBA)</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5">
              <SectionTitle>How payment works</SectionTitle>
              <p className="mt-2 text-sm text-gray-700">
                You register first. After submitting the form, you’ll receive an EFT reference and banking details.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}