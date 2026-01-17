import React, { useState, useEffect } from 'react';
import { RenderSwitch } from '@jswork/react-render-controls/src/main';

export function DataFetchingExample() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const simulateFetch = (newStatus: typeof status) => {
    setStatus('loading');
    setTimeout(() => {
      setStatus(newStatus);
    }, 1500);
  };

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Real-World Example: Data Fetching</h2>
      <div className="p-4 mb-4 bg-white rounded shadow">
        <div className="flex gap-2 mb-4">
          <button
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            onClick={() => simulateFetch('success')}
          >
            Simulate Success
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={() => simulateFetch('error')}
          >
            Simulate Error
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setStatus('idle')}
          >
            Reset
          </button>
        </div>

        <RenderSwitch
          cases={[
            status === 'loading',
            status === 'success',
            status === 'error',
          ]}
          fallback={
            <div className="p-4 bg-gray-50 border rounded border-gray-200">
              <p className="text-gray-600">Click a button to start data fetching simulation.</p>
            </div>
          }
        >
          <div className="p-4 bg-blue-50 border rounded border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-blue-700">Fetching data...</p>
            </div>
          </div>
          <div className="p-4 bg-green-50 border rounded border-green-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-green-800">Data loaded successfully!</p>
                <p className="text-sm text-green-600">Your data is ready to use.</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-red-50 border rounded border-red-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">❌</span>
              <div>
                <p className="font-semibold text-red-800">Failed to load data</p>
                <p className="text-sm text-red-600">Please try again later.</p>
              </div>
            </div>
          </div>
        </RenderSwitch>
      </div>
    </section>
  );
}
