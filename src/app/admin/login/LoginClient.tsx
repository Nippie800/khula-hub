"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Container from "../../../components/Container";
import TextField from "../../../components/TextField";
import PrimaryButton from "../../../components/PrimaryButton";
import { auth } from "../../../lib/firebase";

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
      <polyline points="0,120 460,0" fill="none" stroke="white" strokeOpacity="0.18" strokeWidth="2" />
      <polyline points="220,600 650,300" fill="none" stroke="white" strokeOpacity="0.16" strokeWidth="2" />
      <polyline points="820,0 1200,220" fill="none" stroke="white" strokeOpacity="0.14" strokeWidth="2" />
    </svg>
  );
}

export default function AdminLoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onLogin() {
    setErr("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.push("/admin");
    } catch (e: any) {
      setErr(e?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-teal-600 to-lime-300" />
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-blue-800/40 blur-3xl" />
        <div className="absolute right-[-180px] top-[-160px] h-[520px] w-[520px] rounded-full bg-lime-300/35 blur-3xl" />
        <GeometricOverlay />
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/10" />

        <Container>
          <div className="relative py-10 sm:py-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                Khula NPC • Admin
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Admin Login
              </h1>
              <p className="mt-2 text-sm text-white/90">
                Only authorized admins can access registrations and sponsorship data.
              </p>
            </div>
          </div>
        </Container>

        <div className="h-10 w-full bg-gradient-to-b from-transparent to-slate-50" />
      </section>

      <Container>
        <div className="py-8">
          <div className="mx-auto max-w-xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            {err ? (
              <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                {err}
              </div>
            ) : null}

            <div className="grid gap-4">
              <TextField
                label="Email"
                name="email"
                value={email}
                onChange={setEmail}
                type="email"
                required
                placeholder="admin@email.com"
              />
              <TextField
                label="Password"
                name="password"
                value={password}
                onChange={setPassword}
                type="password"
                required
                placeholder="••••••••"
              />

              <PrimaryButton onClick={onLogin} disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
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