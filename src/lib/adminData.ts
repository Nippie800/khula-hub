import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  FirestoreError,
} from "firebase/firestore";
import { db } from "./firebase";

function handleSnapshotError(label: string, err: FirestoreError) {
  // When you sign out, listeners can still fire briefly — ignore that noise.
  if (err?.code === "permission-denied") return;
  console.error(`${label} snapshot error:`, err);
}

export function subscribeRegistrations(cb: (rows: any[]) => void) {
  const q = query(collection(db, "registrations"), orderBy("createdAt", "desc"));

  return onSnapshot(
    q,
    (snap) => {
      cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    },
    (err) => handleSnapshotError("registrations", err as FirestoreError)
  );
}

export function subscribeSponsorships(cb: (rows: any[]) => void) {
  const q = query(collection(db, "sponsorships"), orderBy("createdAt", "desc"));

  return onSnapshot(
    q,
    (snap) => {
      cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    },
    (err) => handleSnapshotError("sponsorships", err as FirestoreError)
  );
}

export async function markRegistrationPaid(docId: string) {
  await updateDoc(doc(db, "registrations", docId), {
    status: "PAID",
  });
}