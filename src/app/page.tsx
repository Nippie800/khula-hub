import Container from "../components/Container"
import PrimaryButton from "../components/PrimaryButton"
import { CAMP } from "../lib/constants"
import Image from "next/image"

import Hero from "../components/Hero"
import TrustBar from "../components/TrustBar"
import About from "../components/About"
import Programs from "../components/Programs"
import Sponsor from "../components/Sponsor"
import Gallery from "../components/Gallery"
import CTA from "../components/CTA"
import Footer from "../components/Footer"


function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="text-base font-semibold text-gray-900">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">{desc}</p>
    </div>
  )
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
  )
}

export default function HomePage() {
  return (
    <main>

      {/* HERO */}
      <Hero />

      {/* TRUST BAR */}
      <TrustBar />

      {/* ABOUT */}
      <About />

      {/* PROGRAMS */}
      <Programs />

      {/* HOW REGISTRATION WORKS */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-teal-700 to-lime-400">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            How Registration Works
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <Step
              n="1"
              title="Register"
              desc="Complete the learner registration form in under 3 minutes."
            />
            <Step
              n="2"
              title="EFT Payment"
              desc="Receive banking details and your unique payment reference."
            />
            <Step
              n="3"
              title="Confirmation"
              desc="Once payment is matched, Khula confirms your registration."
            />
          </div>
        </Container>
      </section>

      {/* SPONSOR */}
      <Sponsor />

      {/* GALLERY */}
      <Gallery />

      {/* TRUST / VALUES */}
      <section className="py-16">
        <Container>

          <div className="grid gap-8 lg:grid-cols-3">

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                A camp built on truth, ownership, and growth
              </h2>

              <p className="mt-3 text-sm text-gray-700">
                Khula Youth Camps focus on developing strong character,
                leadership and healthy friendships.
              </p>

              <div className="mt-6 rounded-3xl border border-gray-200 bg-gray-50 p-5">
                <div className="text-sm font-semibold text-gray-900">
                  What learners will experience
                </div>

                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  <li>• Ownership and responsibility</li>
                  <li>• Living with truth and integrity</li>
                  <li>• Confidence through action</li>
                  <li>• Strong healthy friendships</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">

              <FeatureCard
                title="Ownership mindset"
                desc="Learners practice responsibility and leadership."
              />

              <FeatureCard
                title="Truth builders"
                desc="Developing integrity and strong decision-making."
              />

              <FeatureCard
                title="Healthy community"
                desc="Friendship, accountability, and growth together."
              />

              <FeatureCard
                title="Practical growth"
                desc="Skills learners can use in real life."
              />

            </div>

          </div>

        </Container>
      </section>


      {/* MEET THE TEAM / REPRESENTATIVES */}
      <section className="py-16 bg-gray-50">
        <Container>

          <h2 className="text-3xl font-bold text-gray-900">
            Meet the Team
          </h2>

          <p className="mt-2 text-sm text-gray-700">
            The people behind Khula Youth Camp.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {/* Marketing rep */}
            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

              <div className="flex items-center gap-4">

                <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-gray-200">

                  <Image
                    src="/team/khulaRep-Photoroom.jpg"
                    alt="Khula representative"
                    fill
                    className="object-cover"
                  />

                </div>

                <div>
                  <div className="text-base font-semibold text-gray-900">
                    Marketing & Social Media
                  </div>

                  <p className="text-xs text-gray-600">
                    Content + Community
                  </p>
                </div>

              </div>

              <p className="mt-4 text-sm text-gray-700">
                Leads camp marketing and manages social media,
                sharing moments that reflect Khula’s values.
              </p>

            </div>

            {["Representative 2", "Representative 3"].map((name) => (
              <div
                key={name}
                className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="text-base font-semibold text-gray-900">
                  {name}
                </div>

                <p className="mt-2 text-sm text-gray-700">
                  Role description coming soon.
                </p>
              </div>
            ))}

          </div>

        </Container>
      </section>


      {/* FAQ */}
      <section className="py-16">
        <Container>

          <h2 className="text-3xl font-bold text-gray-900">FAQ</h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">

            {[
              {
                q: "How do payments work?",
                a: "Register first, then you receive banking details and a unique EFT reference."
              },
              {
                q: "Is the camp heavily religious?",
                a: "It is Christian-based but focuses mainly on character and leadership."
              },
              {
                q: "Can I sponsor a learner?",
                a: "Yes — you can sponsor a full or partial camp ticket."
              },
              {
                q: "Where can I read the Terms & Conditions?",
                a: "They are available on the website and updated regularly."
              }

            ].map((item) => (
              <div
                key={item.q}
                className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="text-base font-semibold text-gray-900">
                  {item.q}
                </div>

                <p className="mt-2 text-sm text-gray-700">
                  {item.a}
                </p>
              </div>
            ))}

          </div>

          <div className="mt-8 flex gap-4">
            <PrimaryButton href="/register">Register</PrimaryButton>
            <PrimaryButton href="/sponsor">Sponsor</PrimaryButton>
          </div>

        </Container>
      </section>


      {/* FINAL CALL TO ACTION */}
      <CTA />

      {/* FOOTER */}
      <Footer />

    </main>
  )
}