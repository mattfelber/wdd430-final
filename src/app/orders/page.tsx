'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';

export default function Orders() {
  const [orders] = useState([
    {
      id: 1,
      date: '2024-02-08',
      total: 79.98,
      status: 'Delivered',
      items: [
        { id: 1, name: 'Handcrafted Ceramic Vase', quantity: 1, price: 29.99 },
        { id: 2, name: 'Woven Wall Hanging', quantity: 1, price: 49.99 },
      ],
    },
    {
      id: 2,
      date: '2024-02-01',
      total: 39.99,
      status: 'Processing',
      items: [
        { id: 3, name: 'Wooden Serving Bowl', quantity: 1, price: 39.99 },
      ],
    },
  ]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Orders</h1>
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Order #{order.id}
                    </h2>
                    <p className="text-sm text-gray-600">Placed on {order.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'Delivered' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="px-6 py-4">
                <ul className="divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="py-4 flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-end border-t pt-4">
                  <p className="text-lg font-semibold text-gray-900">
                    Total: ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
