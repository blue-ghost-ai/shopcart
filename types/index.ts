export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  emoji: string;
}

export interface ShippingOption {
  id: string;
  label: string;
  price: number;
}
