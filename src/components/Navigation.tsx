"use client";

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/solid';

export default function Navigation() {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between">
      <button
        className="md:hidden p-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Bars3Icon className="h-6 w-6 text-gray-700" />
      </button>
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-4`}>
        <Link
          href="/"
          className="block text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
        >
          Home
        </Link>
        <Link
          href="/products"
          className="block text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
        >
          Products
        </Link>
        {user ? (
          <>
            <Link
              href="/dashboard"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
            >
              Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/auth/signin"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
