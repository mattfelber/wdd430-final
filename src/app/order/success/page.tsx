'use client';

import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Success() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mt-6">Order Successful!</h1>
          <p className="text-lg text-gray-600 mt-4">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <div className="mt-8 space-y-4">
            <Link
              href="/orders"
              className="block w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              View Orders
            </Link>
            <Link
              href="/products"
              className="block w-full bg-white text-indigo-600 border border-indigo-600 py-3 px-4 rounded-md hover:bg-indigo-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
