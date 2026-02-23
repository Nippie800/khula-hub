import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export type SponsorshipPayload = {
  ref: string;

  sponsorName: string;
  sponsorEmail: string;
  sponsorPhone: string;

  amount: string;
  preference: "ANY_LEARNER" | "SPECIFIC_LEARNER";
  learnerRef: string;

  message: string;

  status: "PLEDGED" | "RECEIVED" | "ALLOCATED";
};

export async function createSponsorship(payload: SponsorshipPayload) {
  try {
    // sanity logs (you'll see these in the browser console)
    console.log("[createSponsorship] payload:", payload);

    const colRef = collection(db, "sponsorships");

    const docRef = await addDoc(colRef, {
      ...payload,
      createdAt: serverTimestamp(),
    });

    console.log("[createSponsorship] created doc id:", docRef.id);
    return docRef.id;
  } catch (err: any) {
    // This will reveal permission errors immediately
    console.error("[createSponsorship] FAILED:", err);

    // Normalize Firebase error message
    const msg =
      err?.code
        ? `${err.code}: ${err.message ?? "Firebase error"}`
        : err?.message ?? "Unknown error creating sponsorship";

    throw new Error(msg);
  }
}