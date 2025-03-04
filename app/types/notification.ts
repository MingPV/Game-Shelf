export interface Notification {
  id: number;
  receiver_id: string;
  message: string;
  admin_id: string;
  is_read: boolean;
  created_at: string;
}
