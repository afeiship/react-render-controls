import React, { useState } from 'react';
import { RenderMatch } from '@jswork/react-render-controls/src/main';
import { allStatuses, type Status } from '../data';

export function MultipleValuesExample() {
  const [status, setStatus] = useState<Status>('idle');

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Multiple Values per Child</h2>
      <div className="p-4 mb-4 bg-white rounded shadow">
        <div className="flex gap-2 mb-4">
          {(['idle', 'loading', 'success', 'error'] as Status[]).map((s) => (
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
          ))}
        </div>

        <RenderMatch
          value={status}
          items={[['idle', 'loading'], 'success', ['error', 'failed']]}
        >
          <div className="p-4 bg-yellow-100 border rounded">
            <p className="text-yellow-700">
              ⏳ {status === 'idle' ? 'Idle...' : 'Loading...'}
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
  );
}
