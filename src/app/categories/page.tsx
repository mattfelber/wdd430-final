import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';

const CATEGORIES = [
  {
    id: 'ceramics',
    name: 'Ceramics',
    description: 'Handcrafted pottery, vases, and decorative pieces',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=600&fit=crop',
    count: 2
  },
  {
    id: 'woodwork',
    name: 'Woodwork',
    description: 'Custom wooden furniture and home accessories',
    image: 'https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?w=800&h=600&fit=crop',
    count: 2
  },
  {
    id: 'textiles',
    name: 'Textiles',
    description: 'Handwoven fabrics, wall hangings, and home textiles',
    image: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=800&h=600&fit=crop',
    count: 2
  }
];

export default function Categories() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Browse Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category) => (
            <Link
              href={`/products?category=${category.id}`}
              key={category.id}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-200 hover:scale-105">
                <div className="relative h-48">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600">
                    {category.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="text-sm text-gray-500">
                    {category.count} products
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
