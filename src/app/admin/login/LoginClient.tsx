"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Container from "../../../components/Container";
import TextField from "../../../components/TextField";
import PrimaryButton from "../../../components/PrimaryButton";
import { auth } from "../../../lib/firebase";

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
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-10">
      <Container>
        <div className="max-w-xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="mt-1 text-sm text-gray-700">
            Only authorized admins can access registrations and sponsorship data.
          </p>

          {err ? (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {err}
            </div>
          ) : null}

          <div className="mt-6 grid gap-4">
            <TextField
              label="Email"
              name="email"
              value={email}
              onChange={setEmail}
              type="email"
              required
            />
            <TextField
              label="Password"
              name="password"
              value={password}
              onChange={setPassword}
              type="password"
              required
            />

            <PrimaryButton onClick={onLogin} disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </PrimaryButton>
          </div>
        </div>
      </Container>
    </main>
  );
}