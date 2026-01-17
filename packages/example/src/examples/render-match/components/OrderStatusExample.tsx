import React, { useState } from 'react';
import { RenderMatch } from '@jswork/react-render-controls/src/main';
import { orderStatuses } from '../data';

export function OrderStatusExample() {
  const [status, setStatus] = useState<typeof orderStatuses[number]>('created');

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Real-World Example: Order Status</h2>
      <div className="p-4 mb-4 bg-white rounded shadow">
        <div className="flex gap-2 mb-4">
          {orderStatuses.map((s) => (
            <button
              key={s}
              className={`px-4 py-2 rounded capitalize ${
                status === s
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <RenderMatch value={status} items={['created', 'paid', 'shipped', 'delivered']}>
          <div className="p-4 bg-white border-l-4 border-blue-500 rounded shadow-sm">
            <h3 className="font-semibold">Order Created</h3>
            <p className="text-sm text-gray-600">Your order has been created.</p>
          </div>
          <div className="p-4 bg-white border-l-4 border-yellow-500 rounded shadow-sm">
            <h3 className="font-semibold">Payment Received</h3>
            <p className="text-sm text-gray-600">Payment confirmed. Preparing your order.</p>
          </div>
          <div className="p-4 bg-white border-l-4 border-purple-500 rounded shadow-sm">
            <h3 className="font-semibold">Shipped</h3>
            <p className="text-sm text-gray-600">Your order is on its way!</p>
          </div>
          <div className="p-4 bg-white border-l-4 border-green-500 rounded shadow-sm">
            <h3 className="font-semibold">Delivered</h3>
            <p className="text-sm text-gray-600">Your order has been delivered. Thank you!</p>
          </div>
        </RenderMatch>
      </div>
    </section>
  );
}
