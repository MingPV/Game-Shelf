// game interface
export interface Boardgame {
  id: number;
  provier_id: number;
  bg_name: string;
  description: string;
  bg_picture: string;
  price: number;
  created_at: string;
}

export interface RentingRequest {
  id: number;
  start_date: string;
  end_date: string;
  status: string;
  customer_id: string;
  bg_id: string;
  created_at: string;
}
