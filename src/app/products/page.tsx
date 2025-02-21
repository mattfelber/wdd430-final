'use client';

import { useState, useMemo, useEffect } from 'react';
import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'react-hot-toast';
import { useSearchParams, useRouter } from 'next/navigation';
import { CATEGORIES } from '@/data/categories';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  sellerId: number;
  category: string;
}

const PRODUCTS_DATA: Product[] = [
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

export default function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get category from URL or default to 'All'
  const categoryFromUrl = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 100 });
  const [sortOption, setSortOption] = useState<string>('default');

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      router.push('/products');
    } else {
      router.push(`/products?category=${category}`);
    }
  };

  // Sync with URL parameters on mount and URL changes
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const categories = ['All', ...CATEGORIES.map(category => category.name)];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Apply price range filter
    result = result.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Keep original order
        break;
    }

    return result;
  }, [products, selectedCategory, priceRange, sortOption]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-lg text-gray-600 mb-8">
            Each piece is handcrafted with care and attention to detail
          </p>
          
          {/* Filters and Sorting Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Browse Categories
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link
                    href="/products"
                    className={`block relative rounded-lg overflow-hidden ${
                      selectedCategory === 'All' ? 'ring-2 ring-indigo-600' : ''
                    }`}
                  >
                    <div className="relative w-full">
                      <div className="aspect-[4/3]">
                        <Image
                          src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=800&h=450&fit=crop"
                          alt="All Categories"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-lg font-semibold">All Categories</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.id}
                      href={`/products?category=${category.name}`}
                      className={`block relative rounded-lg overflow-hidden ${
                        selectedCategory === category.name ? 'ring-2 ring-indigo-600' : ''
                      }`}
                    >
                      <div className="relative w-full">
                        <div className="aspect-[4/3]">
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white text-lg font-semibold">{category.name}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['All', ...CATEGORIES.map(c => c.name)].map((category) => (
                    <Link
                      key={category}
                      href={category === 'All' ? '/products' : `/products?category=${category}`}
                      className={`px-4 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range (${priceRange.min} - ${priceRange.max})
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange(prev => ({
                        ...prev,
                        min: Math.min(Number(e.target.value), prev.max)
                      }))
                    }
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange(prev => ({
                        ...prev,
                        max: Math.max(Number(e.target.value), prev.min)
                      }))
                    }
                    className="w-full"
                  />
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                >
                  <option value="default" className="bg-white text-gray-900 hover:bg-gray-50">Default</option>
                  <option value="price-asc" className="bg-white text-gray-900 hover:bg-gray-50">Price: Low to High</option>
                  <option value="price-desc" className="bg-white text-gray-900 hover:bg-gray-50">Price: High to Low</option>
                  <option value="name-asc" className="bg-white text-gray-900 hover:bg-gray-50">Name: A to Z</option>
                  <option value="name-desc" className="bg-white text-gray-900 hover:bg-gray-50">Name: Z to A</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredAndSortedProducts.length} products
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedProducts.map((product) => (
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
