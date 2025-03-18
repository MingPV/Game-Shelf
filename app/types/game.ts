// game interface
import { UserData } from "./user";

export interface Boardgame {
  id: number;
  provider_id: string;
  bg_name: string;
  description: string;
  bg_picture: string;
  price: number;
  created_at: string;
  status: string;
  types: string[];
  quantity: number;
  renting: number;
}

export interface RentingRequest {
  id: number;
  start_date: string;
  end_date: string;
  status: string;
  customer_id: string;
  bg_id: number;
  created_at: string;
  provider_id: string;
  boardgames?: Boardgame;
  users?: UserData;
}

export interface Boardgame_type {
  bg_type: string;
  bg_type_id: number;
}

export interface Invoice {
  id: number;
  payer: string;
  payout_to: string;
  amount: number;
  status: string;
  commission_fee: number;
  request_id: number;
  create_at: string;
  session_id: string;
  payment_url: string;
  rental_requests: RentingRequest;
}

export interface toPayRentingRequest {
  id: number;
  start_date: string;
  end_date: string;
  status: string;
  customer_id: string;
  bg_id: number;
  created_at: string;
  provider_id: string;
  boardgames: Boardgame;
  invoices: Invoice[];
  users: UserData;
}

export interface RentingRequestJoinBoardgameJoinProvider {
  id: number;
  start_date: string;
  end_date: string;
  status: string;
  customer_id: string;
  bg_id: number;
  created_at: string;
  provider_id: string;
  boardgames: Boardgame;
  provider: UserData;
  after_ship: string;
  before_return: string;
}

export interface RentingRequestJoinBoardgameJoinCustomer {
  id: number;
  start_date: string;
  end_date: string;
  status: string;
  customer_id: string;
  bg_id: number;
  created_at: string;
  provider_id: string;
  boardgames: Boardgame;
  customer: UserData;
}
