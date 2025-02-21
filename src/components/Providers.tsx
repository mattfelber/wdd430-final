'use client';

import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <Toaster position="top-right" />
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
