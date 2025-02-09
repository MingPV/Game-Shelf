// game interface
export interface Boardgame {
  id: number;
  provier_id: string;
  bg_name: string;
  description: string;
  bg_picture: string;
  price: number;
  created_at: string;
  status: string
}

export interface RentingRequest {
  id: number;
  start_date: string;
  end_date: string;
  status: string;
  customer_id: string;
  bg_id: number;
  created_at: string;
}
