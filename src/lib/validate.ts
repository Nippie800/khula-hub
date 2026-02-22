export function isValidEmail(email: string) {
  const v = email.trim();
  // simple + reliable enough for MVP
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function normalizePhone(phone: string) {
  // remove spaces/dashes
  return phone.replace(/[\s-]/g, "").trim();
}

export function isValidPhone(phone: string) {
  const p = normalizePhone(phone);

  // Accept:
  // 07xxxxxxxx (SA local mobile)
  // +27xxxxxxxxx
  // 0xxxxxxxxx (9-10 digits after 0)
  if (p.startsWith("+27")) return p.length >= 12 && p.length <= 13;
  if (p.startsWith("0")) return p.length >= 10 && p.length <= 11;

  // fallback: at least 9 digits
  return /^\d{9,13}$/.test(p);
}