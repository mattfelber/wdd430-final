'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  sellerId: number;
}

const PRODUCTS_DATA: Product[] = [
  {
    id: 1,
    name: 'Handcrafted Ceramic Vase',
    price: 29.99,
    description: 'Beautiful handmade ceramic vase perfect for any home decor',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop',
    sellerId: 1
  },
  {
    id: 2,
    name: 'Ceramic Coffee Mug Set',
    price: 39.99,
    description: 'Set of 4 handcrafted ceramic coffee mugs',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&h=500&fit=crop',
    sellerId: 1
  },
  {
    id: 3,
    name: 'Wooden Serving Bowl',
    price: 39.99,
    description: 'Hand-carved wooden serving bowl from sustainable materials',
    image: 'https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?w=500&h=500&fit=crop',
    sellerId: 2
  },
  {
    id: 4,
    name: 'Wooden Cutting Board',
    price: 34.99,
    description: 'Handcrafted wooden cutting board with unique grain patterns',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&h=500&fit=crop',
    sellerId: 2
  },
  {
    id: 5,
    name: 'Woven Wall Hanging',
    price: 49.99,
    description: 'Unique woven wall hanging made with natural fibers',
    image: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=500&h=500&fit=crop',
    sellerId: 3
  },
  {
    id: 6,
    name: 'Handwoven Table Runner',
    price: 44.99,
    description: 'Beautiful handwoven table runner with intricate patterns',
    image: 'https://images.unsplash.com/photo-1528822855841-e8bf3134cdc9?w=500&h=500&fit=crop',
    sellerId: 3
  }
];

export default function Products() {
  const { addToCart } = useCart();
  const [products] = useState<Product[]>(PRODUCTS_DATA);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-lg text-gray-600">
            Each piece is handcrafted with care and attention to detail
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="group cursor-pointer">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="relative h-64">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/sellers/${product.sellerId}`}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      View Seller
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
