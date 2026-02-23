"use client";

import { useEffect } from "react";

export type ToastKind = "success" | "info";

export function Toast({
  message,
  show,
  onClose,
  kind = "success",
  duration = 1800,
}: {
  message: string;
  show: boolean;
  onClose: () => void;
  kind?: ToastKind;
  duration?: number;
}) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => onClose(), duration);
    return () => clearTimeout(t);
  }, [show, onClose, duration]);

  if (!show) return null;

  const base =
    "fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-lg backdrop-blur";
  const styles =
    kind === "success"
      ? "border-emerald-200 bg-white/85 text-emerald-800"
      : "border-sky-200 bg-white/85 text-sky-800";

  return (
    <div role="status" aria-live="polite" className={`${base} ${styles}`}>
      {message}
    </div>
  );
}