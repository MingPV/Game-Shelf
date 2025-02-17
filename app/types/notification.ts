export interface Notification {
  id: number;
  receiver_id: string;
  message: string;
  admin_id: string;
  status: boolean;
  created_at: string;
}
