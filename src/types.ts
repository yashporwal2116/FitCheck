export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  gender: 'Men' | 'Women';
  sizes: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  quantity: number;
}

export interface User {
  name: string;
  email: string;
}
