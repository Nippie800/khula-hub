"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "../../components/Container";
import Protected from "../../components/Protected";
import PrimaryButton from "../../components/PrimaryButton";
import Table from "../../components/Table";
import { subscribeRegistrations, subscribeSponsorships, markRegistrationPaid } from "../../lib/adminData";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [sponsorships, setSponsorships] = useState<any[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    const unsub1 = subscribeRegistrations(setRegistrations);
    const unsub2 = subscribeSponsorships(setSponsorships);
    return () => { unsub1(); unsub2(); };
  }, []);

  const filteredRegistrations = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return registrations;
    return registrations.filter((r) =>
      [r.ref, r.parentFullName, r.parentEmail, r.learnerFullName, r.learnerSchool, r.status]
        .filter(Boolean)
        .some((v: string) => String(v).toLowerCase().includes(s))
    );
  }, [registrations, q]);

  async function onMarkPaid(id: string) {
    await markRegistrationPaid(id);
  }

  return (
    <Protected>
      <main className="py-10">
        <Container>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-700">Manage registrations and sponsorships.</p>
            </div>
            <PrimaryButton onClick={() => signOut(auth)}>Sign out</PrimaryButton>
          </div>

          <div className="mt-6 rounded-3xl border border-gray-200 p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold">Registrations</h2>
              <input
                className="w-full sm:w-80 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                placeholder="Search (ref, name, email, status...)"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <Table headers={["Ref", "Learner", "Parent", "Status", "Action"]}>
                {filteredRegistrations.map((r) => (
                  <tr key={r.id} className="border-t border-gray-100">
                    <td className="px-3 py-2 font-medium">{r.ref}</td>
                    <td className="px-3 py-2">
                      <div className="font-medium">{r.learnerFullName}</div>
                      <div className="text-xs text-gray-600">{r.learnerGrade ? `Grade ${r.learnerGrade}` : ""}</div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="font-medium">{r.parentFullName}</div>
                      <div className="text-xs text-gray-600">{r.parentEmail}</div>
                    </td>
                    <td className="px-3 py-2">
                      <span className="rounded-full border border-gray-200 px-2 py-1 text-xs">
                        {r.status ?? "PENDING_PAYMENT"}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      {r.status === "PAID" ? (
                        <span className="text-xs text-gray-600">Paid ✅</span>
                      ) : (
                        <button
                          className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                          onClick={() => onMarkPaid(r.id)}
                        >
                          Mark Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-gray-200 p-4 shadow-sm">
            <h2 className="text-lg font-semibold">Sponsorship pledges</h2>

            <div className="mt-4">
              <Table headers={["Ref", "Sponsor", "Amount", "Preference", "Status"]}>
                {sponsorships.map((s) => (
                  <tr key={s.id} className="border-t border-gray-100">
                    <td className="px-3 py-2 font-medium">{s.ref}</td>
                    <td className="px-3 py-2">
                      <div className="font-medium">{s.sponsorName}</div>
                      <div className="text-xs text-gray-600">{s.sponsorEmail}</div>
                    </td>
                    <td className="px-3 py-2">{s.amount}</td>
                    <td className="px-3 py-2">
                      {s.preference === "SPECIFIC_LEARNER" ? `Learner: ${s.learnerRef}` : "Any learner"}
                    </td>
                    <td className="px-3 py-2">
                      <span className="rounded-full border border-gray-200 px-2 py-1 text-xs">
                        {s.status ?? "PLEDGED"}
                      </span>
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          </div>
        </Container>
      </main>
    </Protected>
  );
}