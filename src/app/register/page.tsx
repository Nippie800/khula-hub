"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "../../components/Container";
import TextField from "../../components/TextField";
import CheckboxField from "../../components/CheckboxField";
import PrimaryButton from "../../components/PrimaryButton";
import { makeKhulaRef } from "../../lib/ref";
import { createRegistration } from "../../lib/registrations";
import { isValidEmail, isValidPhone, normalizePhone } from "../../lib/validate";

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-gray-600">{children}</p>;
}

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

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Parent
  const [parentFullName, setParentFullName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentRelationship, setParentRelationship] = useState("Parent/Guardian");

  // Learner
  const [learnerFullName, setLearnerFullName] = useState("");
  const [learnerDob, setLearnerDob] = useState("");
  const [learnerGrade, setLearnerGrade] = useState("8");
  const [learnerSchool, setLearnerSchool] = useState("");

  // Health
  const [allergies, setAllergies] = useState("");
  const [medicalNotes, setMedicalNotes] = useState("");

  // Emergency
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");

  // Consents
  const [consentIndemnity, setConsentIndemnity] = useState(false);
  const [consentTerms, setConsentTerms] = useState(false);
  const [consentMedia, setConsentMedia] = useState(true);

  const allergiesFinal = useMemo(() => {
    const v = allergies.trim();
    return v ? v : "None";
  }, [allergies]);

  const canSubmit = useMemo(() => {
    if (!parentFullName.trim()) return false;
    if (!parentPhone.trim()) return false;
    if (!parentEmail.trim()) return false;

    if (!learnerFullName.trim()) return false;
    if (!learnerGrade.trim()) return false;

    if (!emergencyContactName.trim()) return false;
    if (!emergencyContactPhone.trim()) return false;

    if (!consentIndemnity) return false;
    if (!consentTerms) return false;

    if (!isValidEmail(parentEmail)) return false;
    if (!isValidPhone(parentPhone)) return false;
    if (!isValidPhone(emergencyContactPhone)) return false;

    return true;
  }, [
    parentFullName,
    parentPhone,
    parentEmail,
    learnerFullName,
    learnerGrade,
    emergencyContactName,
    emergencyContactPhone,
    consentIndemnity,
    consentTerms,
  ]);

  function firstProblem(): string {
    if (!parentFullName.trim()) return "Please enter the parent/guardian full name.";
    if (!parentPhone.trim()) return "Please enter a parent/guardian phone number.";
    if (!isValidPhone(parentPhone)) return "Please enter a valid phone number (e.g. 0812345678 or +27812345678).";
    if (!parentEmail.trim()) return "Please enter the parent/guardian email.";
    if (!isValidEmail(parentEmail)) return "Please enter a valid email address.";

    if (!learnerFullName.trim()) return "Please enter the learner full name.";
    if (!learnerGrade.trim()) return "Please select the learner grade (8–11).";

    if (!emergencyContactName.trim()) return "Please enter an emergency contact name.";
    if (!emergencyContactPhone.trim()) return "Please enter an emergency contact phone number.";
    if (!isValidPhone(emergencyContactPhone)) return "Please enter a valid emergency phone number.";

    if (!consentIndemnity) return "Please accept the indemnity.";
    if (!consentTerms) return "Please accept the terms & conditions.";

    return "";
  }

  async function onSubmit() {
    setError("");
    const problem = firstProblem();
    if (problem) return setError(problem);

    setLoading(true);
    try {
      const ref = makeKhulaRef();

      await createRegistration({
        ref,

        parentFullName: parentFullName.trim(),
        parentPhone: normalizePhone(parentPhone),
        parentEmail: parentEmail.trim(),
        parentRelationship: parentRelationship.trim(),

        learnerFullName: learnerFullName.trim(),
        learnerDob: learnerDob.trim(),
        learnerGrade: learnerGrade.trim(),
        learnerSchool: learnerSchool.trim(),

        allergies: allergiesFinal,
        medicalNotes: medicalNotes.trim(),

        emergencyContactName: emergencyContactName.trim(),
        emergencyContactPhone: normalizePhone(emergencyContactPhone),

        consentIndemnity,
        consentTerms,
        consentMedia,

        status: "PENDING_PAYMENT",
      });

      router.push(`/register/success?ref=${encodeURIComponent(ref)}`);
    } catch (e: any) {
      console.error("Registration submit error:", e);
      setError(e?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Top themed header */}
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
                Khula NPC • Camp Registration
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Register a learner
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-white/90">
                Quick and simple. After submitting, you’ll get an <b>EFT reference</b> and banking details.
                We’re building character one truth at a time — brick by brick.
              </p>

              {error ? (
                <div className="mt-5 rounded-2xl border border-white/20 bg-white/10 p-3 text-sm text-white">
                  <b>Fix this:</b> {error}
                </div>
              ) : null}
            </div>
          </div>
        </Container>

        {/* soft divider */}
        <div className="h-10 w-full bg-gradient-to-b from-transparent to-slate-50" />
      </section>

      <Container>
        <div className="grid gap-6 py-8">
          {/* Sections */}
          <div className="grid gap-6">
            <Section title="Parent / Guardian" subtitle="We’ll use these details to contact you about the learner’s registration.">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Full name & surname" name="parentFullName" value={parentFullName} onChange={setParentFullName} required />
                <TextField label="Relationship to learner" name="parentRelationship" value={parentRelationship} onChange={setParentRelationship} />

                <div className="grid gap-1">
                  <TextField
                    label="Cell number"
                    name="parentPhone"
                    value={parentPhone}
                    onChange={setParentPhone}
                    placeholder="e.g. 0812345678 or +27812345678"
                    required
                  />
                  <Hint>Tip: Include country code if needed (+27…).</Hint>
                </div>

                <div className="grid gap-1">
                  <TextField
                    label="Email"
                    name="parentEmail"
                    value={parentEmail}
                    onChange={setParentEmail}
                    type="email"
                    placeholder="name@email.com"
                    required
                  />
                  <Hint>We’ll send key updates to this email address.</Hint>
                </div>
              </div>
            </Section>

            <Section title="Learner" subtitle="Please ensure the learner’s name matches their school records.">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Full name & surname" name="learnerFullName" value={learnerFullName} onChange={setLearnerFullName} required />

                <div className="grid gap-1">
                  <label htmlFor="learnerGrade" className="text-sm font-medium text-gray-900">
                    Grade (8–11) <span className="text-red-600">*</span>
                  </label>

                  <select
                    id="learnerGrade"
                    name="learnerGrade"
                    className="h-11 w-full rounded-2xl border border-gray-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-teal-600"
                    value={learnerGrade}
                    onChange={(e) => setLearnerGrade(e.target.value)}
                  >
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                  </select>

                  <Hint>This helps us plan age-appropriate groups.</Hint>
                </div>

                <TextField label="Date of birth (optional)" name="learnerDob" value={learnerDob} onChange={setLearnerDob} type="date" />
                <TextField label="School (optional)" name="learnerSchool" value={learnerSchool} onChange={setLearnerSchool} placeholder="School name" />
              </div>
            </Section>

            <Section title="Health" subtitle="This helps our team keep learners safe during activities.">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1">
                  <TextField
                    label="Allergies"
                    name="allergies"
                    value={allergies}
                    onChange={setAllergies}
                    placeholder='Leave blank to use "None"'
                  />
                  <Hint>
                    We’ll store this as: <b>{allergiesFinal}</b>
                  </Hint>
                </div>

                <TextField
                  label="Medical notes (optional)"
                  name="medicalNotes"
                  value={medicalNotes}
                  onChange={setMedicalNotes}
                  placeholder="Asthma, medication, etc."
                />
              </div>
            </Section>

            <Section title="Emergency contact" subtitle="Someone we can reach quickly if needed.">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Name" name="emergencyContactName" value={emergencyContactName} onChange={setEmergencyContactName} required />

                <div className="grid gap-1">
                  <TextField
                    label="Phone number"
                    name="emergencyContactPhone"
                    value={emergencyContactPhone}
                    onChange={setEmergencyContactPhone}
                    placeholder="e.g. 0812345678 or +27812345678"
                    required
                  />
                  <Hint>Make sure this number is reachable during camp hours.</Hint>
                </div>
              </div>
            </Section>

            <Section title="Consent" subtitle="Required to complete registration.">
              <div className="grid gap-3">
                <CheckboxField
                  checked={consentIndemnity}
                  onChange={setConsentIndemnity}
                  label={
                    <>
                      I accept the{" "}
                      <a className="underline" href="/indemnity">
                        indemnity
                      </a>{" "}
                      and understand participation is at my/our own risk.
                    </>
                  }
                />

                <CheckboxField
                  checked={consentTerms}
                  onChange={setConsentTerms}
                  label={
                    <>
                      I accept the{" "}
                      <a className="underline" href="/terms">
                        terms &amp; conditions
                      </a>{" "}
                      for Khula NPC camp.
                    </>
                  }
                />

                <CheckboxField checked={consentMedia} onChange={setConsentMedia} label={<>Media consent (photo/video) for camp content (optional).</>} />
              </div>
            </Section>
          </div>

          {/* Sticky submit bar */}
          <div className="sticky bottom-4">
            <div className="rounded-3xl border border-gray-200 bg-white/85 p-4 shadow-sm backdrop-blur">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-gray-700">
                  You’ll receive an <b>EFT reference</b> after submission.
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <PrimaryButton onClick={onSubmit} disabled={loading}>
                    {loading ? "Submitting..." : "Submit registration"}
                  </PrimaryButton>

                  <a className="text-sm text-gray-700 underline" href="/">
                    Back to home
                  </a>
                </div>
              </div>

              {!canSubmit ? (
                <p className="mt-3 text-xs text-gray-600">
                  Tip: Complete required fields and accept indemnity + terms to submit.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}