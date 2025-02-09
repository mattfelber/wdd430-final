import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Navigation() {
  const { user, signOut } = useAuth();

  return (
    <nav className="flex items-center space-x-4">
      <Link
        href="/"
        className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
      >
        Home
      </Link>
      <Link
        href="/products"
        className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
      >
        Products
      </Link>
      {user ? (
        <>
          <Link
            href="/dashboard"
            className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
          >
            Dashboard
          </Link>
          <button
            onClick={() => signOut()}
            className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link
            href="/auth/signin"
            className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
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
    </nav>
  );
}
