import Container from "../components/Container";
import PrimaryButton from "../components/PrimaryButton";
import { CAMP } from "../lib/constants";
import Image from "next/image";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
      {children}
    </span>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="text-base font-semibold text-gray-900">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">{desc}</p>
    </div>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-white/15 bg-white/10 p-5 text-white shadow-sm">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-sm font-bold">
          {n}
        </span>
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/85">{desc}</p>
    </div>
  );
}

/**
 * Lightweight geometric overlay (like screenshot 165)
 * - uses translucent panels + lines
 * - no external assets
 */
function GeometricOverlay() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-40"
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

      {/* Big angled panels */}
      <polygon points="0,80 420,0 560,0 160,240" fill="url(#glassA)" />
      <polygon points="140,560 560,260 720,340 320,600" fill="url(#glassB)" />
      <polygon points="760,0 1200,0 1200,260 980,240" fill="url(#glassA)" />
      <polygon points="620,600 860,420 1200,540 1200,600" fill="url(#glassB)" />

      {/* Thin outline lines */}
      <polyline
        points="0,120 460,0"
        fill="none"
        stroke="white"
        strokeOpacity="0.18"
        strokeWidth="2"
      />
      <polyline
        points="220,600 650,300"
        fill="none"
        stroke="white"
        strokeOpacity="0.16"
        strokeWidth="2"
      />
      <polyline
        points="820,0 1200,220"
        fill="none"
        stroke="white"
        strokeOpacity="0.14"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="pb-12">
      
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-teal-600 to-lime-300" />

        {/* Soft bokeh lights */}
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-800/45 blur-2xl" />
        <div className="absolute left-1/4 top-10 h-[680px] w-[680px] rounded-full bg-teal-500/35 blur-3xl" />
        <div className="absolute -right-48 -top-28 h-[560px] w-[560px] rounded-full bg-lime-300/45 blur-2xl" />
        <div className="absolute -bottom-72 left-10 h-[720px] w-[720px] rounded-full bg-blue-700/35 blur-3xl" />

        {/* Geometric overlay (like screenshot 165) */}
        <GeometricOverlay />

        {/* Subtle wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/12" />

        <Container>
          <div className="relative py-14 sm:py-16">
            {/* Lively layout: text left, invite card right on large screens */}
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap gap-2">
                  <Pill>{CAMP.name} (est. {CAMP.est})</Pill>
                  <Pill>Grades 8–11</Pill>
                  <Pill>Truth builders</Pill>
                </div>

                <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  {CAMP.slogan}
                </h1>

                <p className="mt-4 text-base leading-relaxed text-white/90">
                  A warm, high-energy camp where learners grow in <b>ownership</b>, <b>integrity</b>, and <b>character</b> —
                  built brick by brick, step by step.
                </p>

                <p className="mt-3 text-sm leading-relaxed text-white/85">
                  Christian-based (not heavy) — focused on practical truth, healthy community, and becoming the kind of person
                  who can build a life that lasts.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <PrimaryButton href="/register">Register a learner</PrimaryButton>
                  <PrimaryButton href="/sponsor">Sponsor a learner</PrimaryButton>
                </div>

                <p className="mt-4 text-sm text-white/80">
                  Theme: <span className="font-semibold">{CAMP.themeLine}</span>
                </p>
              </div>

              {/* Invite card */}
              <div className="lg:col-span-5">
                <div className="rounded-[28px] border border-white/20 bg-white/10 p-5 text-white shadow-sm backdrop-blur">
                  <div className="text-sm font-semibold">What to expect</div>
                  <ul className="mt-3 space-y-2 text-sm text-white/90">
                    <li>• Real conversations that build truth + confidence</li>
                    <li>• Team moments that shape leadership + courage</li>
                    <li>• Practical habits learners can take home</li>
                    <li>• A safe, uplifting environment with strong values</li>
                  </ul>

                  <div className="mt-5 rounded-2xl border border-white/15 bg-white/10 p-4">
                    <div className="text-xs text-white/80">Key details</div>
                    <div className="mt-2 grid gap-2 text-sm">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-white/85">Dates</span>
                        <span className="font-semibold">24th-27th of April</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-white/85">Venue</span>
                        <span className="font-semibold">TBA</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-white/85">Fee</span>
                        <span className="font-semibold">TBA</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-white/75">
                    Register first — you’ll receive banking details + a unique EFT reference.
                  </p>
                </div>
              </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <Step n="1" title="Register" desc="Complete the learner registration form in under 3 minutes." />
              <Step n="2" title="EFT with reference" desc="You receive banking details + a unique reference to use on EFT." />
              <Step n="3" title="Admin confirms" desc="Once payment is matched, the registration is confirmed by Khula NPC." />
            </div>
          </div>
        </Container>
      </section>

      {/* TRUST / WHAT YOU GET */}
      <section className="py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900">
                A camp built on truth, ownership, and growth
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                Khula is about building strong foundations — character under construction, one truth at a time.
              </p>

              <div className="mt-6 rounded-3xl border border-gray-200 bg-gray-50 p-5">
                <div className="text-sm font-semibold text-gray-900">What learners will experience</div>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  <li>• Ownership — taking responsibility for choices</li>
                  <li>• Truth — living with integrity when it matters</li>
                  <li>• Confidence — building courage through action</li>
                  <li>• Community — growing with healthy friendships</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
              <FeatureCard
                title="Ownership mindset"
                desc="Learners practice responsibility, self-leadership, and follow-through — not just talk."
              />
              <FeatureCard
                title="Truth builders"
                desc="Integrity and decision-making — building a life that lasts, brick by brick."
              />
              <FeatureCard
                title="Healthy community"
                desc="Friendship, accountability, and support — a space where learners grow together."
              />
              <FeatureCard
                title="Practical growth"
                desc="Tools and habits learners can apply at school, at home, and in their future."
              />
            </div>
          </div>
        </Container>
      </section>

      {/* SPONSORSHIP IMPACT */}
      <section className="py-12">
        <Container>
          <div className="relative overflow-hidden rounded-[32px] border border-gray-200 bg-gradient-to-br from-blue-900 via-teal-700 to-lime-300 p-6 shadow-sm sm:p-8">
            <div className="absolute inset-0 opacity-35">
              <GeometricOverlay />
            </div>

            <div className="relative max-w-3xl">
              <h2 className="text-2xl font-bold text-white">
                Sponsor a learner — build someone’s future
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                Not every learner can afford camp. Sponsorship helps cover tickets (full or partial) so no one is left behind.
                This is “student sponsors student” — community, generosity, and growth.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryButton href="/sponsor">Sponsor now</PrimaryButton>
                <a className="text-sm font-semibold text-white underline" href="/register">
                  Register a learner
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

            {/* TEAM / REPS */}
      <section className="py-12">
        <Container>
          <h2 className="text-2xl font-bold text-gray-900">Meet the team</h2>
          <p className="mt-2 text-sm text-gray-700">
            The people behind the camp — building strong character, one truth at a time.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* ✅ Marketing / Social Media rep */}
            <div className="group rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-[2px] hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                  <Image
                    src="/team/khulaRep-Photoroom.jpg"
                    alt="Khula NPC representative"
                    fill
                    className="object-cover"
                    sizes="64px"
                    priority
                  />
                </div>

                <div className="min-w-0">
                  <div className="text-base font-semibold text-gray-900">
                    Marketing & Social Media
                  </div>
                  <p className="mt-0.5 text-xs text-gray-600">
                    Marketing Department • Content + Community
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                Leads camp marketing and manages social media — sharing updates, stories, and moments
                that reflect the camp’s values and energy.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
                  📣 Marketing
                </span>
                <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
                  📱 Social Media
                </span>
                <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
                  🤝 Community
                </span>
              </div>
            </div>

            {/* Other placeholders (keep or replace later) */}
            {["Representative 2", "Representative 3"].map((name) => (
              <div key={name} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="text-base font-semibold text-gray-900">{name}</div>
                <p className="mt-2 text-sm text-gray-700">
                  Short description (TBA). Add role, experience, and why they care about building character.
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <Container>
          <h2 className="text-2xl font-bold text-gray-900">FAQ</h2>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {[
              {
                q: "How do payments work?",
                a: "You register first, then you receive banking details and a unique EFT reference to use.",
              },
              {
                q: "Is this camp heavily religious?",
                a: "It is Christian-based, but not heavy. The focus is practical character-building and truth-based living.",
              },
              {
                q: "Can I sponsor a specific learner?",
                a: "Yes. If you have their registration reference, you can sponsor them directly.",
              },
              {
                q: "Where can I read the Ts&Cs / Indemnity?",
                a: "They are available on the site and will be updated with final wording from Khula NPC.",
              },
            ].map((item) => (
              <div key={item.q} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="text-base font-semibold text-gray-900">{item.q}</div>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton href="/register">Register</PrimaryButton>
            <PrimaryButton href="/sponsor">Sponsor</PrimaryButton>
          </div>
        </Container>
      </section>
    </main>
  );
}