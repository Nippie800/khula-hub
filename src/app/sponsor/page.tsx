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
    if (!sponsorName.trim()) return false;
    if (!isValidEmail(sponsorEmail)) return false;
    if (!isValidPhone(sponsorPhone)) return false;
    if (!amount.trim()) return false;
    if (specificLearner && !learnerRef.trim()) return false;
    return true;
  }, [sponsorName, sponsorEmail, sponsorPhone, amount, specificLearner, learnerRef]);

  async function onSubmit() {
    setErr("");

    if (!sponsorName.trim()) return setErr("Please enter your name.");
    if (!isValidEmail(sponsorEmail)) return setErr("Please enter a valid email.");
    if (!isValidPhone(sponsorPhone)) return setErr("Please enter a valid phone number.");
    if (!amount.trim()) return setErr("Please enter an amount (or write 'Full ticket').");
    if (specificLearner && !learnerRef.trim()) return setErr("Please enter the learner reference code.");

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

      router.push(`/sponsor/success?ref=${encodeURIComponent(ref)}`);
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="py-10">
      <Container>
        <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Sponsor a learner</h1>
          <p className="mt-1 text-sm text-gray-700">
            Sponsor a learner’s camp ticket (full or partial). After submitting, you’ll receive an EFT reference.
          </p>

          {err ? (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {err}
            </div>
          ) : null}

          <div className="mt-6 grid gap-8">
            <section className="grid gap-4">
              <h2 className="text-lg font-semibold">Sponsor details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Full name" name="sponsorName" value={sponsorName} onChange={setSponsorName} required />
                <TextField label="Phone number" name="sponsorPhone" value={sponsorPhone} onChange={setSponsorPhone} required />
                <TextField label="Email" name="sponsorEmail" value={sponsorEmail} onChange={setSponsorEmail} type="email" required />
                <TextField label="Amount" name="amount" value={amount} onChange={setAmount} placeholder='e.g. 500 or "Full ticket"' required />
              </div>
            </section>

            <section className="grid gap-3">
              <h2 className="text-lg font-semibold">Preference</h2>

              <CheckboxField
                checked={specificLearner}
                onChange={setSpecificLearner}
                label={<>I want to sponsor a <b>specific learner</b> (enter their reference code).</>}
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
                  />
                </div>
              ) : null}
            </section>

            <section className="grid gap-2">
              <h2 className="text-lg font-semibold">Message (optional)</h2>
              <textarea
                className="w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:ring-2 focus:ring-black"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="A short encouragement message (optional)"
                rows={4}
              />
            </section>

            <PrimaryButton onClick={onSubmit} disabled={loading || !canSubmit}>
              {loading ? "Submitting..." : "Submit sponsorship"}
            </PrimaryButton>
          </div>
        </div>
      </Container>
    </main>
  );
}