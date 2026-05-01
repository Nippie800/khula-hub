import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import About from "../components/About";
import Programs from "../components/Programs";
import Sponsor from "../components/Sponsor";
import Gallery from "../components/Gallery";
import CTA from "../components/CTA";
import Team from "../components/Team";
import Container from "../components/Container";
import PrimaryButton from "../components/PrimaryButton";

export default function HomePage() {
  return (
    <main className="bg-[#f4f0ea]">

      {/* HERO */}
      <Hero />

      {/* TRUST BADGES */}
      <TrustBar />

      {/* ABOUT */}
      <section id="about" className="scroll-mt-24">
        <About />
      </section>

      {/* PROGRAMS (NEW PREMIUM VERSION) */}
      <section id="programs" className="scroll-mt-24">
        <Programs />
      </section>

      {/* HOW IT WORKS (SIMPLIFIED + CLEAN) */}
      <section className="bg-gradient-to-br from-[#1f3c3a] via-[#2f6f68] to-[#8fd4c7] py-16">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold">How it works</h2>
            <p className="mt-2 text-white/80 text-sm">
              Simple steps to get started with Khula
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                title: "Register",
                desc: "Complete the learner registration form in under 3 minutes.",
              },
              {
                n: "02",
                title: "EFT Payment",
                desc: "Receive banking details and your unique reference.",
              },
              {
                n: "03",
                title: "Confirmation",
                desc: "Once payment is matched, your spot is secured.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-6 text-white"
              >
                <div className="text-2xl font-light text-white/60">
                  {step.n}
                </div>
                <div className="mt-2 text-lg font-semibold">
                  {step.title}
                </div>
                <p className="mt-2 text-sm text-white/80">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SPONSOR SECTION */}
      <Sponsor />

      {/* TEAM (NEW UPGRADED COMPONENT) */}
      <section id="team" className="scroll-mt-24">
        <Team />
      </section>

      {/* GALLERY */}
      <section id="gallery" className="scroll-mt-24">
        <Gallery />
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-16">
        <Container>
          <div className="rounded-3xl border border-[#e0d7cc] bg-white p-10 text-center shadow-sm">
            <h2 className="text-3xl font-bold text-[#3a2a1c]">
              Ready to build your child’s future?
            </h2>

            <p className="mt-3 text-gray-600 text-sm max-w-xl mx-auto">
              Give them an experience that builds confidence, character,
              and real-life leadership skills.
            </p>

            <div className="mt-6 flex justify-center gap-4">
              <PrimaryButton href="/register">
                Register Now
              </PrimaryButton>
              <PrimaryButton href="/sponsor">
                Sponsor a Learner
              </PrimaryButton>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ (CLEANER + TRUST-FOCUSED) */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[#3a2a1c] text-center">
            Frequently Asked Questions
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {[
              {
                q: "How do payments work?",
                a: "You register first, then receive banking details and a unique EFT reference.",
              },
              {
                q: "Is the camp heavily religious?",
                a: "It is Christian-based, but focused on character, leadership, and growth.",
              },
              {
                q: "Can I sponsor a learner?",
                a: "Yes — you can sponsor fully or partially to help another learner attend.",
              },
              {
                q: "Where are the Terms & Conditions?",
                a: "They are available on the website and shared during registration.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-[#e6ded3] p-5"
              >
                <div className="font-semibold text-[#3a2a1c]">
                  {item.q}
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <CTA />

    </main>
  );
}