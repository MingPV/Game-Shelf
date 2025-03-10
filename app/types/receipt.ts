export interface Receipt {
  id: number;
  receipt_detail: string;
  end_date: Date;
  process_fee: number;
  invoice_id: number;
  created_at: string;
  amount: number;
  provider_id: string;
  customer_id: string;
}
