import { Product } from '../types';

const defaultSizes = ['S', 'M', 'L', 'XL'];

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Leather Jacket',
    price: 5999,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
    category: 'Outerwear',
    gender: 'Men',
    sizes: defaultSizes
  },
  {
    id: '2',
    name: 'Silk Slip Dress',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
    category: 'Dresses',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: '3',
    name: 'Denim Overshirt',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800',
    category: 'Shirts',
    gender: 'Men',
    sizes: defaultSizes
  },
  {
    id: '4',
    name: 'Pleated Midi Skirt',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&q=80&w=800',
    category: 'Bottoms',
    gender: 'Women',
    sizes: ['S', 'M', 'L']
  },
  {
    id: '5',
    name: 'Minimalist Wool Coat',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=800',
    category: 'Outerwear',
    gender: 'Men',
    sizes: ['M', 'L', 'XL']
  },
  {
    id: '6',
    name: 'Cashmere Turtleneck',
    price: 4299,
    image: 'https://images.unsplash.com/photo-1580331451062-99ff652288d7?auto=format&fit=crop&q=80&w=800',
    category: 'Knitwear',
    gender: 'Women',
    sizes: defaultSizes
  },
  {
    id: '7',
    name: 'Relaxed Fit Chinos',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
    category: 'Bottoms',
    gender: 'Men',
    sizes: ['30', '32', '34', '36']
  },
  {
    id: '8',
    name: 'Floral Summer Blouse',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
    category: 'Tops',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L']
  }
];
