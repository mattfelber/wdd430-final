'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'react-hot-toast';
import { StarIcon } from '@heroicons/react/20/solid';

interface Review {
  id: number;
  productId: number;
  userId: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
}

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

const REVIEWS_DATA: Review[] = [
  {
    id: 1,
    productId: 1,
    userId: 'user1',
    userName: 'Sarah Johnson',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop',
    rating: 5,
    comment: 'This vase is absolutely beautiful! The craftsmanship is exceptional, and it looks perfect in my living room.',
    date: '2025-02-15'
  },
  {
    id: 2,
    productId: 1,
    userId: 'user2',
    userName: 'Michael Chen',
    userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop',
    rating: 4,
    comment: 'Great quality vase, love the unique design. Shipping was fast too!',
    date: '2025-02-10'
  },
  {
    id: 3,
    productId: 2,
    userId: 'user3',
    userName: 'Emily Davis',
    userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop',
    rating: 5,
    comment: 'These mugs are perfect! They keep my coffee hot for a long time and look beautiful.',
    date: '2025-02-18'
  }
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`h-5 w-5 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

function ReviewForm({ productId, onSubmit }: { productId: number; onSubmit: (review: Omit<Review, 'id'>) => void }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      productId,
      userId: 'currentUser',
      userName: 'Current User',
      userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    });
    setComment('');
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <div className="flex items-center mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="p-1"
            >
              <StarIcon
                className={`h-6 w-6 ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-200'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Review</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Write your review here..."
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit Review
      </button>
    </form>
  );
}

export default function ProductDetail() {
  const params = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const productId = parseInt(params.id as string);
    const foundProduct = PRODUCTS_DATA.find(p => p.id === productId);
    const productReviews = REVIEWS_DATA.filter(r => r.productId === productId);
    
    setProduct(foundProduct || null);
    setReviews(productReviews);
  }, [params.id]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddReview = (review: Omit<Review, 'id'>) => {
    const newReview = {
      ...review,
      id: Math.max(...reviews.map(r => r.id), 0) + 1
    };
    setReviews(prev => [...prev, newReview]);
    toast.success('Review submitted successfully!');
  };

  if (!product) {
    return <Layout><div className="container mx-auto px-4 py-8">Product not found</div></Layout>;
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative h-96">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm mb-4">
              {product.category}
            </div>
            <p className="text-gray-600 text-lg mb-6">{product.description}</p>
            <div className="flex items-center mb-6">
              <StarRating rating={Math.round(averageRating)} />
              <span className="ml-2 text-gray-600">
                ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-6">
              ${product.price.toFixed(2)}
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Add to Cart
            </button>
            <Link 
              href={`/sellers/${product.sellerId}`}
              className="block text-center mt-4 text-indigo-600 hover:text-indigo-800"
            >
              View Seller
            </Link>
          </div>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-8">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-8">
                <div className="flex items-center mb-4">
                  <Image
                    src={review.userImage}
                    alt={review.userName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <p className="font-semibold">{review.userName}</p>
                    <div className="flex items-center">
                      <StarRating rating={review.rating} />
                      <span className="ml-2 text-sm text-gray-500">
                        {formatDate(review.date)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>
            <ReviewForm productId={product.id} onSubmit={handleAddReview} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
