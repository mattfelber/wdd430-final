'use client';

import { useCart } from '@/contexts/CartContext';
import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      toast.success('Item removed from cart');
    } else {
      updateQuantity(productId, newQuantity);
      toast.success('Cart updated');
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven&apos;t added any items to your cart yet.</p>
          <Link
            href="/products"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id} className="p-6 flex items-center">
                <div className="relative h-24 w-24 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="ml-6 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="text-lg font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-700"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-gray-600 border-x">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-700"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                        toast.success('Item removed from cart');
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6">
              <Link
                href="/checkout"
                className="block w-full bg-indigo-600 px-4 py-3 rounded-md font-medium text-white text-center hover:bg-indigo-700 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/products"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
