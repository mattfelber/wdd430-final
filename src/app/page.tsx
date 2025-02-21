'use client';

import Image from "next/image";
import Layout from "@/components/Layout";
import Link from "next/link";
import { CATEGORIES } from '@/data/categories';

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

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600">Discover unique handcrafted items in every category</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CATEGORIES.map((category) => (
              <Link
                href={`/products?category=${category.name}`}
                key={category.id}
                className="group block"
              >
                <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transform transition duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                      <p className="text-white text-sm px-4">{category.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/categories"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </section>

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
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-3">
            {CATEGORIES.map((category) => (
              <Link
                href={`/products?category=${category.name}`}
                key={category.id}
                className="relative rounded-lg overflow-hidden h-40 group cursor-pointer"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
