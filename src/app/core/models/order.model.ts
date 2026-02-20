export interface Order {
  id: string;
  date: Date;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}