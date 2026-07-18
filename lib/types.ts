export type RegistrationStatus = "new" | "confirmed" | "paid" | "cancelled";

export const STATUS_LABELS: Record<RegistrationStatus, string> = {
  new: "Nová",
  confirmed: "Potvrzená",
  paid: "Zaplacená",
  cancelled: "Zrušená",
};

export interface ClubRegistration {
  id: string;
  created_at: string;
  season: string;
  child_name: string;
  email: string;
  phone: string;
  whatsapp_choice: "add" | "no_add" | "cannot" | "other";
  whatsapp_other: string | null;
  terms: string[];
  health_notes: string | null;
  status: RegistrationStatus;
  admin_notes: string | null;
}

export interface CampRegistration {
  id: string;
  created_at: string;
  camp: string;
  child_name: string;
  father_name: string;
  mother_name: string;
  email: string;
  child_age: number;
  child_birthdate: string;
  phone_mother: string;
  phone_father: string;
  health_notes: string;
  sports: string[];
  sports_other: string | null;
  roommates: string | null;
  status: RegistrationStatus;
  admin_notes: string | null;
}
