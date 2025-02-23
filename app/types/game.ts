// game interface
import { UserData } from "./user";

export interface Boardgame {
  id: number;
  provier_id: string;
  bg_name: string;
  description: string;
  bg_picture: string;
  price: number;
  created_at: string;
  status: string;
  types: string[];
  quantity: number;
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
