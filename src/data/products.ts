export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  sellerId: number;
  category: string;
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: 1,
    name: 'Handcrafted Ceramic Vase',
    price: 29.99,
    description: 'Beautiful handmade ceramic vase perfect for any home decor',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop',
    sellerId: 1,
    category: 'Ceramics'
  },
  {
    id: 2,
    name: 'Ceramic Coffee Mug Set',
    price: 39.99,
    description: 'Set of 4 handcrafted ceramic coffee mugs',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&h=500&fit=crop',
    sellerId: 1,
    category: 'Ceramics'
  },
  {
    id: 3,
    name: 'Wooden Serving Bowl',
    price: 39.99,
    description: 'Hand-carved wooden serving bowl from sustainable materials',
    image: 'https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?w=500&h=500&fit=crop',
    sellerId: 2,
    category: 'Woodwork'
  },
  {
    id: 4,
    name: 'Wooden Cutting Board',
    price: 34.99,
    description: 'Handcrafted wooden cutting board with unique grain patterns',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&h=500&fit=crop',
    sellerId: 2,
    category: 'Woodwork'
  },
  {
    id: 5,
    name: 'Woven Wall Hanging',
    price: 49.99,
    description: 'Unique woven wall hanging made with natural fibers',
    image: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=500&h=500&fit=crop',
    sellerId: 3,
    category: 'Textiles'
  },
  {
    id: 6,
    name: 'Handwoven Table Runner',
    price: 44.99,
    description: 'Beautiful handwoven table runner with intricate patterns',
    image: 'https://images.unsplash.com/photo-1528822855841-e8bf3134cdc9?w=500&h=500&fit=crop',
    sellerId: 3,
    category: 'Textiles'
  }
];
