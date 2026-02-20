import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export type RegistrationPayload = {
  ref: string;

  parentFullName: string;
  parentPhone: string;
  parentEmail: string;
  parentRelationship: string;

  learnerFullName: string;
  learnerDob: string;
  learnerGrade: string;
  learnerSchool: string;

  allergies: string;
  medicalNotes: string;

  emergencyContactName: string;
  emergencyContactPhone: string;

  consentIndemnity: boolean;
  consentTerms: boolean;
  consentMedia: boolean;

  status: "PENDING_PAYMENT" | "PAID" | "CONFIRMED";
};

export async function createRegistration(payload: RegistrationPayload) {
  const col = collection(db, "registrations");
  const docRef = await addDoc(col, {
    ...payload,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}