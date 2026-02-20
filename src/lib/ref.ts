export function makeRef(prefix: "KHULA" | "SPONSOR") {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000); // 4 digits
  return `${prefix}-${year}-${rand}`;
}