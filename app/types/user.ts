export interface UserData {
  uid: string;
  email: string;
  username: string;
  profilePicture: string;
  phoneNumber: string;
  paymentMethod: string;
  isProvider: boolean;
  is_verified: boolean;
  is_disabled: boolean;
  location: string;
  credentials: string;
  maxQuota: number;
  created_at: string;
  admin_id: Number;
  is_admin: boolean;
}

export interface verificationRequests {
  provider_id: string;
  status: string;
  approver: Number;
  created_at: string;
  users: UserData;
}
