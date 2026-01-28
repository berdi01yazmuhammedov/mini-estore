export interface Order {
  id: string;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  total_price: number;
  contact: string;
  contact_type: 'telegram' | 'email';
  is_pickup: 'Самовывоз' | 'Доставка';
  address: string | null;
  status: string;
  created_at: string;
}