"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Container from "../../components/Container";
import Protected from "../../components/Protected";
import PrimaryButton from "../../components/PrimaryButton";
import Table from "../../components/Table";
import {
  subscribeRegistrations,
  subscribeSponsorships,
  markRegistrationPaid,
} from "../../lib/adminData";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { CAMP } from "../../lib/constants";

function GeometricOverlay() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-30"
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

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold text-gray-500">{label}</div>
      <div className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900">
        {value}
      </div>
      {sub ? <div className="mt-1 text-xs text-gray-600">{sub}</div> : null}
    </div>
  );
}

function StatusPill({ value }: { value: string }) {
  const v = (value || "").toUpperCase();
  const base =
    "inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold";

  if (v === "PAID")
    return (
      <span className={`${base} border-emerald-200 bg-emerald-50 text-emerald-700`}>
        PAID
      </span>
    );

  if (v === "PENDING_PAYMENT")
    return (
      <span className={`${base} border-amber-200 bg-amber-50 text-amber-700`}>
        PENDING
      </span>
    );

  if (v === "PLEDGED")
    return (
      <span className={`${base} border-sky-200 bg-sky-50 text-sky-700`}>
        PLEDGED
      </span>
    );

  if (v === "RECEIVED")
    return (
      <span className={`${base} border-indigo-200 bg-indigo-50 text-indigo-700`}>
        RECEIVED
      </span>
    );

  if (v === "ALLOCATED")
    return (
      <span className={`${base} border-teal-200 bg-teal-50 text-teal-700`}>
        ALLOCATED
      </span>
    );

  return (
    <span className={`${base} border-gray-200 bg-gray-50 text-gray-700`}>
      {value || "UNKNOWN"}
    </span>
  );
}

function clampPct(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [sponsorships, setSponsorships] = useState<any[]>([]);
  const [q, setQ] = useState("");

  const unsubsRef = useRef<(() => void)[] | null>(null);

  useEffect(() => {
    const unsub1 = subscribeRegistrations(setRegistrations);
    const unsub2 = subscribeSponsorships(setSponsorships);

    unsubsRef.current = [unsub1, unsub2];

    return () => {
      unsub1();
      unsub2();
      unsubsRef.current = null;
    };
  }, []);

  const filteredRegistrations = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return registrations;
    return registrations.filter((r) =>
      [
        r.ref,
        r.parentFullName,
        r.parentEmail,
        r.learnerFullName,
        r.learnerSchool,
        r.status,
      ]
        .filter(Boolean)
        .some((v: string) => String(v).toLowerCase().includes(s))
    );
  }, [registrations, q]);

  const stats = useMemo(() => {
    const total = registrations.length;
    const paid = registrations.filter(
      (r) => (r.status || "").toUpperCase() === "PAID"
    ).length;
    const pending = total - paid;

    const pledges = sponsorships.length;
    const pledged = sponsorships.filter(
      (s) => (s.status || "").toUpperCase() === "PLEDGED"
    ).length;

    return { total, paid, pending, pledges, pledged };
  }, [registrations, sponsorships]);

  const capacity = Number(CAMP?.capacity ?? 0) || 0;
  const fillPct = clampPct(capacity ? (stats.total / capacity) * 100 : 0);

  async function onMarkPaid(id: string) {
    await markRegistrationPaid(id);
  }

  async function onLogout() {
    try {
      unsubsRef.current?.forEach((fn) => fn());
      unsubsRef.current = null;
    } finally {
      await signOut(auth);
    }
  }

  return (
    <Protected>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-teal-600 to-lime-300" />
          <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-blue-800/40 blur-3xl" />
          <div className="absolute right-[-180px] top-[-160px] h-[520px] w-[520px] rounded-full bg-lime-300/35 blur-3xl" />
          <GeometricOverlay />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/10" />

          <Container>
            <div className="relative py-10 sm:py-12">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                    Khula NPC • Admin
                  </div>
                  <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    Admin Dashboard
                  </h1>
                  <p className="mt-2 text-sm text-white/90">
                    Manage registrations and sponsorships. Confirm payments and keep the system clean.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onLogout}
                    className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </Container>

          <div className="h-10 w-full bg-gradient-to-b from-transparent to-slate-50" />
        </section>

        <Container>
          <div className="grid gap-6 py-8">
            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <StatCard label="Total registrations" value={stats.total} />
              <StatCard
                label="Pending payment"
                value={stats.pending}
                sub="Waiting for EFT match"
              />
              <StatCard label="Paid" value={stats.paid} sub="Confirmed registrations" />
              <StatCard
                label="Sponsorship pledges"
                value={stats.pledges}
                sub={`${stats.pledged} pledged`}
              />
            </div>

            {/* ✅ Camp fill meter */}
            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-gray-500">Camp fill</div>
                  <div className="mt-1 text-sm text-gray-700">
                    {capacity ? (
                      <>
                        <b>{stats.total}</b> / <b>{capacity}</b> spots filled
                      </>
                    ) : (
                      <>Set <b>CAMP.capacity</b> in constants to enable the fill meter.</>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-600">
                    Brick by brick — watch the camp fill up in real time.
                  </p>
                </div>

                <div className="text-sm font-semibold text-gray-900">
                  {capacity ? `${Math.round(fillPct)}%` : "—"}
                </div>
              </div>

              <div className="mt-3 h-2 w-full rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-teal-600 to-lime-400 transition-all"
                  style={{ width: `${fillPct}%` }}
                />
              </div>

              {capacity && stats.total >= capacity ? (
                <p className="mt-2 text-xs font-semibold text-amber-700">
                  Camp is full — consider switching registrations to a waitlist.
                </p>
              ) : null}
            </div>

            {/* Registrations */}
            <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Registrations</h2>
                  <p className="mt-1 text-xs text-gray-600">
                    Search by ref, learner, parent, email, school, status…
                  </p>
                </div>

                <input
                  className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/40 sm:w-80"
                  placeholder="Search..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>

              <div className="mt-4 overflow-x-auto">
                <Table headers={["Ref", "Learner", "Parent", "Status", "Action"]}>
                  {filteredRegistrations.map((r) => (
                    <tr key={r.id} className="border-t border-gray-100">
                      <td className="px-3 py-3 font-medium">{r.ref}</td>

                      <td className="px-3 py-3">
                        <div className="font-medium text-gray-900">{r.learnerFullName}</div>
                        <div className="text-xs text-gray-600">
                          {r.learnerGrade ? `Grade ${r.learnerGrade}` : ""}
                          {r.learnerSchool ? ` • ${r.learnerSchool}` : ""}
                        </div>
                      </td>

                      <td className="px-3 py-3">
                        <div className="font-medium text-gray-900">{r.parentFullName}</div>
                        <div className="text-xs text-gray-600">{r.parentEmail}</div>
                      </td>

                      <td className="px-3 py-3">
                        <StatusPill value={r.status ?? "PENDING_PAYMENT"} />
                      </td>

                      <td className="px-3 py-3">
                        {String(r.status || "").toUpperCase() === "PAID" ? (
                          <span className="text-xs font-semibold text-emerald-700">
                            Paid ✅
                          </span>
                        ) : (
                          <button
                            className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-600/40"
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

            {/* Sponsorships */}
            <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Sponsorship pledges</h2>
                <p className="mt-1 text-xs text-gray-600">
                  Track sponsor pledges and allocation preferences.
                </p>
              </div>

              <div className="mt-4 overflow-x-auto">
                <Table headers={["Ref", "Sponsor", "Amount", "Preference", "Status"]}>
                  {sponsorships.map((s) => (
                    <tr key={s.id} className="border-t border-gray-100">
                      <td className="px-3 py-3 font-medium">{s.ref}</td>
                      <td className="px-3 py-3">
                        <div className="font-medium text-gray-900">{s.sponsorName}</div>
                        <div className="text-xs text-gray-600">{s.sponsorEmail}</div>
                      </td>
                      <td className="px-3 py-3">{s.amount}</td>
                      <td className="px-3 py-3">
                        {s.preference === "SPECIFIC_LEARNER"
                          ? `Learner: ${s.learnerRef}`
                          : "Any learner"}
                      </td>
                      <td className="px-3 py-3">
                        <StatusPill value={s.status ?? "PLEDGED"} />
                      </td>
                    </tr>
                  ))}
                </Table>
              </div>
            </div>

            {/* Quick nav */}
            <div className="flex flex-wrap gap-3">
              <PrimaryButton href="/">Back to home</PrimaryButton>
              <PrimaryButton href="/register">Register page</PrimaryButton>
              <PrimaryButton href="/sponsor">Sponsor page</PrimaryButton>
            </div>
          </div>
        </Container>
      </main>
    </Protected>
  );
}