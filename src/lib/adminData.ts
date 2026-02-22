import { collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export function subscribeRegistrations(cb: (rows: any[]) => void) {
  const q = query(collection(db, "registrations"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export function subscribeSponsorships(cb: (rows: any[]) => void) {
  const q = query(collection(db, "sponsorships"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function markRegistrationPaid(docId: string) {
  await updateDoc(doc(db, "registrations", docId), {
    status: "PAID",
  });
}