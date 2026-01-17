import React, { useState } from 'react';
import { RenderMatch } from '@jswork/react-render-controls/src/main';

type Status = 'idle' | 'loading' | 'success' | 'error';

function RenderMatchExample() {
  const [status, setStatus] = useState<Status>('idle');

  return (
    <div className="space-y-8">
      {/* Basic usage */}
      <section>
        <h2 className="mb-4 text-xl font-bold">Basic Usage</h2>
        <div className="p-4 mb-4 bg-white rounded shadow">
          <div className="flex gap-2 mb-4">
            {(['idle', 'loading', 'success', 'error'] as Status[]).map((s) => (
              <button
                key={s}
                className={`px-4 py-2 rounded ${
                  status === s
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => setStatus(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <RenderMatch
            value={status}
            items={['idle', 'loading', 'success', 'error']}
          >
            <div className="p-4 bg-gray-100 border rounded">
              <p className="text-gray-700">📭 Idle state</p>
            </div>
            <div className="p-4 bg-blue-100 border rounded">
              <p className="text-blue-700">⏳ Loading...</p>
            </div>
            <div className="p-4 bg-green-100 border rounded">
              <p className="text-green-700">✅ Success!</p>
            </div>
            <div className="p-4 bg-red-100 border rounded">
              <p className="text-red-700">❌ Error occurred</p>
            </div>
          </RenderMatch>
        </div>
      </section>

      {/* With array values (multiple values map to same child) */}
      <section>
        <h2 className="mb-4 text-xl font-bold">Multiple Values per Child</h2>
        <div className="p-4 mb-4 bg-white rounded shadow">
          <div className="flex gap-2 mb-4">
            {(['pending', 'processing', 'completed', 'failed'] as Status[]).map(
              (s) => (
                <button
                  key={s}
                  className={`px-4 py-2 rounded ${
                    status === s
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  onClick={() => setStatus(s)}
                >
                  {s}
                </button>
              )
            )}
          </div>

          <RenderMatch
            value={status}
            items={[
              ['pending', 'processing'],
              'completed',
              ['failed', 'error'],
            ]}
          >
            <div className="p-4 bg-yellow-100 border rounded">
              <p className="text-yellow-700">
                ⏳ {status === 'pending' ? 'Pending...' : 'Processing...'}
              </p>
            </div>
            <div className="p-4 bg-green-100 border rounded">
              <p className="text-green-700">✅ Completed!</p>
            </div>
            <div className="p-4 bg-red-100 border rounded">
              <p className="text-red-700">❌ Failed</p>
            </div>
          </RenderMatch>
        </div>
      </section>

      {/* Real-world example: Order status */}
      <section>
        <h2 className="mb-4 text-xl font-bold">Real-World Example: Order Status</h2>
        <div className="p-4 mb-4 bg-white rounded shadow">
          <div className="flex gap-2 mb-4">
            {(['created', 'paid', 'shipped', 'delivered'] as const).map((s) => (
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

          <RenderMatch
            value={status}
            items={['created', 'paid', 'shipped', 'delivered']}
          >
            <div className="p-4 bg-white border-l-4 border-blue-500 rounded shadow-sm">
              <h3 className="font-semibold">Order Created</h3>
              <p className="text-sm text-gray-600">Your order has been created.</p>
            </div>
            <div className="p-4 bg-white border-l-4 border-yellow-500 rounded shadow-sm">
              <h3 className="font-semibold">Payment Received</h3>
              <p className="text-sm text-gray-600">
                Payment confirmed. Preparing your order.
              </p>
            </div>
            <div className="p-4 bg-white border-l-4 border-purple-500 rounded shadow-sm">
              <h3 className="font-semibold">Shipped</h3>
              <p className="text-sm text-gray-600">
                Your order is on its way!
              </p>
            </div>
            <div className="p-4 bg-white border-l-4 border-green-500 rounded shadow-sm">
              <h3 className="font-semibold">Delivered</h3>
              <p className="text-sm text-gray-600">
                Your order has been delivered. Thank you!
              </p>
            </div>
          </RenderMatch>
        </div>
      </section>
    </div>
  );
}

export default RenderMatchExample;
