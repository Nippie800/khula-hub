"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "../../components/Container";
import TextField from "../../components/TextField";
import PrimaryButton from "../../components/PrimaryButton";
import CheckboxField from "../../components/CheckboxField";
import { makeSponsorRef } from "../../lib/ref";
import { createSponsorship } from "../../lib/sponsorship";
import { isValidEmail, isValidPhone, normalizePhone } from "../../lib/validate";

function GeometricOverlay() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-35"
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

      <polygon points="0,80 420,0 560,0 160,240" fill="url(#glassA)" />
      <polygon points="140,560 560,260 720,340 320,600" fill="url(#glassB)" />
      <polygon points="760,0 1200,0 1200,260 980,240" fill="url(#glassA)" />
      <polygon points="620,600 860,420 1200,540 1200,600" fill="url(#glassB)" />

      <polyline points="0,120 460,0" fill="none" stroke="white" strokeOpacity="0.18" strokeWidth="2" />
      <polyline points="220,600 650,300" fill="none" stroke="white" strokeOpacity="0.16" strokeWidth="2" />
      <polyline points="820,0 1200,220" fill="none" stroke="white" strokeOpacity="0.14" strokeWidth="2" />
    </svg>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-3 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-gray-700">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

export default function SponsorPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [sponsorName, setSponsorName] = useState("");
  const [sponsorEmail, setSponsorEmail] = useState("");
  const [sponsorPhone, setSponsorPhone] = useState("");
  const [amount, setAmount] = useState("");

  const [specificLearner, setSpecificLearner] = useState(false);
  const [learnerRef, setLearnerRef] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit = useMemo(() => {
    const name = sponsorName.trim();
    const email = sponsorEmail.trim();
    const phone = sponsorPhone.trim();
    const amt = amount.trim();
    const lref = learnerRef.trim();

    if (!name) return false;
    if (!email || !isValidEmail(email)) return false;
    if (!phone || !isValidPhone(phone)) return false;
    if (!amt) return false;
    if (specificLearner && !lref) return false;
    return true;
  }, [sponsorName, sponsorEmail, sponsorPhone, amount, specificLearner, learnerRef]);

  function validate() {
    const name = sponsorName.trim();
    const email = sponsorEmail.trim();
    const phone = sponsorPhone.trim();
    const amt = amount.trim();
    const lref = learnerRef.trim();

    if (!name) return "Please enter your full name.";
    if (!email) return "Please enter your email address.";
    if (!isValidEmail(email)) return "Please enter a valid email address (e.g. name@email.com).";
    if (!phone) return "Please enter your phone number.";
    if (!isValidPhone(phone)) return "Please enter a valid phone number (e.g. 0812345678 or +27812345678).";
    if (!amt) return `Please enter an amount (e.g. "500") or write "Full ticket".`;
    if (specificLearner && !lref) return "Please enter the learner reference code (e.g. KHULA-2026-1234).";
    return "";
  }

  async function onSubmit() {
    setErr("");
    const problem = validate();
    if (problem) return setErr(problem);

    setLoading(true);
    try {
      const ref = makeSponsorRef();

      await createSponsorship({
        ref,
        sponsorName: sponsorName.trim(),
        sponsorEmail: sponsorEmail.trim(),
        sponsorPhone: normalizePhone(sponsorPhone),
        amount: amount.trim(),
        preference: specificLearner ? "SPECIFIC_LEARNER" : "ANY_LEARNER",
        learnerRef: specificLearner ? learnerRef.trim() : "",
        message: message.trim(),
        status: "PLEDGED",
      });

      router.push(
  `/sponsor/success?ref=${encodeURIComponent(ref)}&amount=${encodeURIComponent(amount.trim())}`
);
    } catch (e: any) {
      console.error("Sponsor submit error:", e);
      setErr(e?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Themed header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-teal-600 to-lime-300" />
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-blue-800/40 blur-3xl" />
        <div className="absolute right-[-180px] top-[-160px] h-[520px] w-[520px] rounded-full bg-lime-300/35 blur-3xl" />
        <GeometricOverlay />
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/10" />

        <Container>
          <div className="relative py-10 sm:py-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                Khula NPC • Sponsorship
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Sponsor a learner
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-white/90">
                Help cover a camp ticket (full or partial). After submitting, you’ll receive an <b>EFT reference</b>.
                Brick by brick, one truth at a time.
              </p>

              {err ? (
                <div className="mt-5 rounded-2xl border border-white/20 bg-white/10 p-3 text-sm text-white">
                  <b>Fix this:</b> {err}
                </div>
              ) : null}

              <div className="mt-5 rounded-2xl border border-white/20 bg-white/10 p-4 text-xs text-white/90">
                <div className="font-semibold text-white">Quick examples</div>
                <div className="mt-1">
                  Amount: <b>500</b> or <b>Full ticket</b>
                </div>
                <div>
                  Phone: <b>0812345678</b> or <b>+27812345678</b>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <div className="h-10 w-full bg-gradient-to-b from-transparent to-slate-50" />
      </section>

      <Container>
        <div className="grid gap-6 py-8">
          <div className="grid gap-6">
            <Section title="Sponsor details" subtitle="Your details are used only for sponsorship administration.">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Full name" name="sponsorName" value={sponsorName} onChange={setSponsorName} required />
                <TextField
                  label="Phone number"
                  name="sponsorPhone"
                  value={sponsorPhone}
                  onChange={setSponsorPhone}
                  placeholder="e.g. 0812345678 or +27812345678"
                  required
                  hint="Tip: include +27 if needed."
                />
                <TextField
                  label="Email"
                  name="sponsorEmail"
                  value={sponsorEmail}
                  onChange={setSponsorEmail}
                  type="email"
                  placeholder="name@email.com"
                  required
                  hint="We may contact you if we need to verify payment."
                />
                <TextField
                  label="Amount"
                  name="amount"
                  value={amount}
                  onChange={setAmount}
                  placeholder='e.g. 500 or "Full ticket"'
                  required
                  hint='You can also write "Full ticket".'
                />
              </div>
            </Section>

            <Section title="Preference" subtitle="Choose how you want your sponsorship allocated.">
              <div className="grid gap-3">
                <CheckboxField
                  checked={specificLearner}
                  onChange={setSpecificLearner}
                  label={
                    <>
                      I want to sponsor a <b>specific learner</b> (enter their registration reference code).
                    </>
                  }
                />

                {specificLearner ? (
                  <div className="max-w-md">
                    <TextField
                      label="Learner reference code"
                      name="learnerRef"
                      value={learnerRef}
                      onChange={setLearnerRef}
                      placeholder="e.g. KHULA-2026-1234"
                      required
                      hint="If you don’t have a code, uncheck the box to sponsor any learner."
                    />
                  </div>
                ) : (
                  <p className="text-sm text-gray-700">
                    You’re sponsoring <b>any learner</b> who needs support. Khula NPC will allocate funds responsibly.
                  </p>
                )}
              </div>
            </Section>

            <Section title="Message (optional)" subtitle="Add a short encouragement note.">
              <textarea
                className="w-full rounded-2xl border border-gray-200 bg-white p-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="A short encouragement message (optional)"
                rows={4}
              />
            </Section>
          </div>

          {/* Sticky submit bar */}
          <div className="sticky bottom-4">
            <div className="rounded-3xl border border-gray-200 bg-white/85 p-4 shadow-sm backdrop-blur">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-gray-700">
                  Submit to receive your <b>EFT reference</b>. (No payment gate.)
                </div>

                <div className="flex items-center gap-3">
                  <PrimaryButton onClick={onSubmit} disabled={loading}>
                    {loading ? "Submitting..." : "Submit sponsorship"}
                  </PrimaryButton>
                </div>
              </div>

              {!canSubmit ? (
                <p className="mt-3 text-xs text-gray-600">
                  Tip: complete required fields, then submit to generate your EFT reference.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}