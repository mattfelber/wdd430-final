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
  sellerId: number;
}

const SELLERS_DATA: Seller[] = [
  {
    id: 1,
    name: 'John\'s Pottery',
    description: 'Handcrafted ceramic pieces made with love. Each piece is uniquely designed and carefully crafted to bring beauty and function to your home. With over 10 years of experience in pottery making, we take pride in creating pieces that will last a lifetime.',
    image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=1200&auto=format&fit=crop',
    profileImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Wooden Wonders',
    description: 'Beautiful wooden crafts and furniture, handcrafted from sustainable materials. Our workshop specializes in creating unique pieces that combine traditional woodworking techniques with modern design aesthetics.',
    image: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=1200&auto=format&fit=crop',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Textile Treasures',
    description: 'Unique handwoven textiles and fabrics created using traditional techniques and contemporary designs. Each piece tells a story through its intricate patterns and carefully selected materials.',
    image: 'https://images.unsplash.com/photo-1459501462159-97d5bded1416?w=1200&auto=format&fit=crop',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop'
  }
];

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

export default function SellerProfile() {
  const params = useParams();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);

  useEffect(() => {
    const sellerId = parseInt(params.id as string);
    const foundSeller = SELLERS_DATA.find(s => s.id === sellerId);
    const foundProducts = PRODUCTS_DATA.filter(p => p.sellerId === sellerId);
    
    setSeller(foundSeller || null);
    setSellerProducts(foundProducts);
  }, [params.id]);

  if (!seller) {
    return <Layout><div className="container mx-auto px-4 py-8">Seller not found</div></Layout>;
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
                priority
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
                    priority
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
          {sellerProducts.map((product) => (
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
