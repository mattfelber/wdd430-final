'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';

interface Seller {
  id: number;
  name: string;
  description: string;
  image: string;
  profileImage: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function SellerProfile() {
  const params = useParams();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: 'Handcrafted Ceramic Vase',
      price: 29.99,
      description: 'Beautiful handmade ceramic vase perfect for any home decor',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop'
    },
    {
      id: 2,
      name: 'Wooden Serving Bowl',
      price: 39.99,
      description: 'Hand-carved wooden serving bowl from sustainable materials',
      image: 'https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?w=500&h=500&fit=crop'
    },
  ]);

  useEffect(() => {
    // Simulate fetching seller data
    const mockSeller = {
      id: 1,
      name: 'John\'s Pottery',
      description: 'Handcrafted ceramic pieces made with love. Each piece is uniquely designed and carefully crafted to bring beauty and function to your home. With over 10 years of experience in pottery making, we take pride in creating pieces that will last a lifetime.',
      image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=1200&auto=format&fit=crop',
      profileImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop'
    };
    setSeller(mockSeller);
  }, [params.id]);

  if (!seller) {
    return <Layout><div className="container mx-auto px-4 py-8">Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-96">
              <Image
                src={seller.image}
                alt={`${seller.name}'s workshop`}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <div className="flex items-center mb-6">
                <div className="relative w-24 h-24 mr-6">
                  <Image
                    src={seller.profileImage}
                    alt={seller.name}
                    fill
                    className="rounded-full object-cover"
                    sizes="96px"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{seller.name}</h1>
                </div>
              </div>
              <p className="text-gray-600 text-lg">{seller.description}</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Products by {seller.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-600 mt-1">{product.description}</p>
                  <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
