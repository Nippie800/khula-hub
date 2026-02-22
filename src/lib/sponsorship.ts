import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export type SponsorshipPayload = {
  ref: string;

  sponsorName: string;
  sponsorEmail: string;
  sponsorPhone: string;

  amount: string; // keep as string for MVP ("500", "Full ticket", etc.)
  preference: "ANY_LEARNER" | "SPECIFIC_LEARNER";
  learnerRef: string; // if specific learner, otherwise ""

  message: string;

  status: "PLEDGED" | "RECEIVED" | "ALLOCATED";
};

export async function createSponsorship(payload: SponsorshipPayload) {
  const col = collection(db, "sponsorships");
  const docRef = await addDoc(col, { ...payload, createdAt: serverTimestamp() });
  return docRef.id;
}