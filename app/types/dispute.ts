import { UserData } from "./user";

export interface Dispute {
  id: number;
  customer_id: string;
  details: string;
  admin_id: string;
  verdict: string;
  status: string;
  created_at: string;
}
