import { UserData } from "./user";

export interface Dispute {
  id: number;
  reporter: string;
  report_to: string;
  type: string;
  details: string;
  admin_id: string;
  verdict: string;
  status: string;
  created_at: string;
  rental_id: string;
  title: string;
}
