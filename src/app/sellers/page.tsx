'use client';

import { useState } from 'react';
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

export default function SellersPage() {
  const [sellers] = useState<Seller[]>([
    {
      id: 1,
      name: 'John\'s Pottery',
      description: 'Handcrafted ceramic pieces made with love',
      image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&auto=format&fit=crop',
      profileImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Wooden Wonders',
      description: 'Beautiful wooden crafts and furniture',
      image: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&auto=format&fit=crop',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Textile Treasures',
      description: 'Unique handwoven textiles and fabrics',
      image: 'https://images.unsplash.com/photo-1459501462159-97d5bded1416?w=800&auto=format&fit=crop',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop'
    },
  ]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Sellers</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sellers.map((seller) => (
            <Link href={`/sellers/${seller.id}`} key={seller.id}>
              <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={seller.image}
                    alt={`${seller.name}'s workshop`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="relative w-16 h-16 mr-4">
                      <Image
                        src={seller.profileImage}
                        alt={seller.name}
                        fill
                        className="rounded-full object-cover"
                        sizes="64px"
                        priority
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{seller.name}</h2>
                      <p className="text-gray-600">{seller.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
