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
  parent_name: string | null;
  email: string;
  phone: string;
  whatsapp_choice: "add" | "no_add" | "cannot" | "other";
  whatsapp_other: string | null;
  terms: string[];
  health_notes: string | null;
  base_amount_czk: number;
  total_amount_czk: number;
  billing_name: string | null;
  billing_street: string | null;
  billing_city: string | null;
  billing_zip: string | null;
  legal_terms_accepted_at: string | null;
  photo_consent: boolean;
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
  base_amount_czk: number;
  discount_code_id: string | null;
  discount_code: string | null;
  discount_amount_czk: number;
  total_amount_czk: number;
  billing_name: string | null;
  billing_street: string | null;
  billing_city: string | null;
  billing_zip: string | null;
  legal_terms_accepted_at: string | null;
  photo_consent: boolean;
  status: RegistrationStatus;
  admin_notes: string | null;
}

export interface Invoice {
  id: string;
  created_at: string;
  camp_registration_id: string | null;
  club_registration_id: string | null;
  invoice_number: string;
  variable_symbol: string;
  issue_date: string;
  due_date: string;
  supplier_name: string;
  supplier_address: string;
  supplier_ico: string;
  supplier_registry: string;
  supplier_vat_note: string;
  buyer_name: string;
  buyer_address: string;
  buyer_email: string;
  item_name: string;
  base_amount_czk: number;
  discount_code: string | null;
  discount_amount_czk: number;
  total_amount_czk: number;
  bank_account: string;
  iban: string;
  bic: string;
  storage_path: string;
  sent_at: string | null;
  status: "issued" | "sent" | "cancelled";
}
