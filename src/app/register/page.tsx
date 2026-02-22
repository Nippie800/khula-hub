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

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Parent
  const [parentFullName, setParentFullName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentRelationship, setParentRelationship] = useState("Parent");

  // Learner
  const [learnerFullName, setLearnerFullName] = useState("");
  const [learnerDob, setLearnerDob] = useState(""); // yyyy-mm-dd
  const [learnerGrade, setLearnerGrade] = useState("");
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

  const canSubmit = useMemo(() => {
    if (!parentFullName.trim()) return false;
    if (!parentPhone.trim()) return false;
    if (!parentEmail.trim()) return false;

    if (!learnerFullName.trim()) return false;
    if (!learnerGrade.trim()) return false;

    if (!allergies.trim()) return false; // require even "None"
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
    allergies,
    emergencyContactName,
    emergencyContactPhone,
    consentIndemnity,
    consentTerms,
  ]);

  async function onSubmit() {
    setError("");
    if (!canSubmit) {
      if (!parentFullName.trim()) return setError("Please enter the parent/guardian full name.");
if (!parentPhone.trim()) return setError("Please enter a parent/guardian phone number.");
if (!isValidPhone(parentPhone)) return setError("Please enter a valid phone number (e.g. 07x... or +27...).");
if (!parentEmail.trim()) return setError("Please enter the parent/guardian email.");
if (!isValidEmail(parentEmail)) return setError("Please enter a valid email address.");

if (!learnerFullName.trim()) return setError("Please enter the learner full name.");
if (!learnerGrade.trim()) return setError("Please enter the learner grade (8–11).");

if (!emergencyContactName.trim()) return setError("Please enter an emergency contact name.");
if (!emergencyContactPhone.trim()) return setError("Please enter an emergency contact phone number.");
if (!isValidPhone(emergencyContactPhone)) return setError("Please enter a valid emergency phone number.");

if (!consentIndemnity) return setError("Please accept the indemnity.");
if (!consentTerms) return setError("Please accept the terms & conditions.");
    }

    setLoading(true);
    try {
      const ref = makeKhulaRef();

      const allergiesFinal = allergies.trim() ? allergies.trim() : "None";

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
        emergencyContactPhone: emergencyContactPhone.trim(),

        consentIndemnity,
        consentTerms,
        consentMedia,

        status: "PENDING_PAYMENT",
      });

      router.push(`/register/success?ref=${encodeURIComponent(ref)}`);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="py-10">
      <Container>
        <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Register a learner</h1>
          <p className="mt-1 text-sm text-gray-700">
            Complete this form. After submitting, you’ll receive an EFT reference and banking details.
          </p>

          {error ? (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          ) : null}

          <div className="mt-6 grid gap-8">
            <section className="grid gap-4">
              <h2 className="text-lg font-semibold">Parent / Guardian</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Full name & surname" name="parentFullName" value={parentFullName} onChange={setParentFullName} required />
                <TextField label="Relationship to learner" name="parentRelationship" value={parentRelationship} onChange={setParentRelationship} />
                <TextField label="Cell number" name="parentPhone" value={parentPhone} onChange={setParentPhone} placeholder="e.g. 07x xxx xxxx" required />
                <TextField label="Email" name="parentEmail" value={parentEmail} onChange={setParentEmail} type="email" placeholder="name@email.com" required />
              </div>
            </section>

            <section className="grid gap-4">
              <h2 className="text-lg font-semibold">Learner</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Full name & surname" name="learnerFullName" value={learnerFullName} onChange={setLearnerFullName} required />
                <TextField label="Grade (8–11)" name="learnerGrade" value={learnerGrade} onChange={setLearnerGrade} placeholder="e.g. 9" required />
                <TextField label="Date of birth (optional)" name="learnerDob" value={learnerDob} onChange={setLearnerDob} type="date" />
                <TextField label="School (optional)" name="learnerSchool" value={learnerSchool} onChange={setLearnerSchool} placeholder="School name" />
              </div>
            </section>

            <section className="grid gap-4">
              <h2 className="text-lg font-semibold">Health</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
  label="Allergies"
  name="allergies"
  value={allergies}
  onChange={setAllergies}
  placeholder='Leave blank to auto-fill "None"'
  required
/>
                <TextField label="Medical notes (optional)" name="medicalNotes" value={medicalNotes} onChange={setMedicalNotes} placeholder="Asthma, medication, etc." />
              </div>
            </section>

            <section className="grid gap-4">
              <h2 className="text-lg font-semibold">Emergency contact</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Name" name="emergencyContactName" value={emergencyContactName} onChange={setEmergencyContactName} required />
                <TextField label="Phone number" name="emergencyContactPhone" value={emergencyContactPhone} onChange={setEmergencyContactPhone} required />
              </div>
            </section>

            <section className="grid gap-3">
              <h2 className="text-lg font-semibold">Consent</h2>
             <CheckboxField
  checked={consentIndemnity}
  onChange={setConsentIndemnity}
  label={
    <>
      I accept the <a className="underline" href="/indemnity">indemnity</a> and understand participation is at my/our own risk.
    </>
  }
/>

<CheckboxField
  checked={consentTerms}
  onChange={setConsentTerms}
  label={
    <>
      I accept the <a className="underline" href="/terms">terms &amp; conditions</a> for Khula NPC camp.
    </>
  }
/>
              <CheckboxField
                checked={consentMedia}
                onChange={setConsentMedia}
                label={
                  <>
                    Media consent (photo/video) for camp content (optional).
                  </>
                }
              />
            </section>

            <div className="flex flex-wrap items-center gap-3">
              <PrimaryButton onClick={onSubmit} disabled={loading || !canSubmit}>
                {loading ? "Submitting..." : "Submit registration"}
              </PrimaryButton>

              <a className="text-sm text-gray-700 underline" href="/">
                Back to home
              </a>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}