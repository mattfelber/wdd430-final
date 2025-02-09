'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex items-center">
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex md:items-center md:space-x-4">
        <Link href="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
          Home
        </Link>
        <Link href="/products" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
          Products
        </Link>
        <Link href="/cart" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
          Cart
        </Link>
        <Link href="/orders" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
          Orders
        </Link>
        <Link href="/auth/signin" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
          Sign In
        </Link>
        <Link href="/auth/signup" className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
          Sign Up
        </Link>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 right-0 left-0 bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/products" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
              Products
            </Link>
            <Link href="/cart" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
              Cart
            </Link>
            <Link href="/orders" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
              Orders
            </Link>
            <Link href="/auth/signin" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
              Sign In
            </Link>
            <Link href="/auth/signup" className="block bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
