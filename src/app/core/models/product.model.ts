export interface Product {
  id: string;
  name: string;
  sku: string;
  category: 'Electronics' | 'Furniture' | 'Office';
  price: number;
  stockLevel: number;
  minThreshold: number; 
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}