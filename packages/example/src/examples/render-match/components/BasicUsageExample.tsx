import React, { useState } from 'react';
import { RenderMatch } from '@jswork/react-render-controls/src/main';
import { allStatuses, type Status } from '../data';

export function BasicUsageExample() {
  const [status, setStatus] = useState<Status>('idle');

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Basic Usage</h2>
      <div className="p-4 mb-4 bg-white rounded shadow">
        <div className="flex gap-2 mb-4">
          {allStatuses.map((s) => (
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

        <RenderMatch value={status} items={['idle', 'loading', 'success', 'error']}>
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
  );
}
