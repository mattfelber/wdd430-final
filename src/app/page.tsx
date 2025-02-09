'use client';

import Image from "next/image";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-indigo-50 py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1544967082-d9d25d867d66"
            alt="Handcrafted items background"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Welcome to</span>
              <span className="block text-indigo-600">Handcrafted Haven</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover unique handcrafted items made with love and care by talented artisans.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {/* Example Product Card */}
          <div className="group relative">
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1610701596007-11502861dcfa"
                alt="Handmade ceramic vase"
                width={400}
                height={300}
                className="object-cover object-center"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <span className="absolute inset-0"></span>
                  Handmade Ceramic Vase
                </h3>
                <p className="mt-1 text-sm text-gray-500">Pottery</p>
              </div>
              <p className="text-sm font-medium text-gray-900">$45.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Browse Categories</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {[
              { name: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338' },
              { name: 'Pottery', image: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2' },
              { name: 'Textiles', image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66' },
              { name: 'Woodwork', image: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941' }
            ].map((category) => (
              <div
                key={category.name}
                className="relative rounded-lg overflow-hidden h-40 group"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-200">
                  <div className="flex items-center justify-center h-full">
                    <h3 className="text-lg font-medium text-white">{category.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
