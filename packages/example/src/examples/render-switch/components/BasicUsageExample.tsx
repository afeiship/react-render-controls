import React, { useState } from 'react';
import { RenderSwitch } from '@jswork/react-render-controls/src/main';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export function BasicUsageExample() {
  const [state, setState] = useState<LoadingState>('idle');

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Basic Usage</h2>
      <div className="p-4 mb-4 bg-white rounded shadow">
        <div className="flex gap-2 mb-4">
          {(['idle', 'loading', 'success', 'error'] as LoadingState[]).map((s) => (
            <button
              key={s}
              className={`px-4 py-2 rounded ${
                state === s
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setState(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <RenderSwitch cases={[state === 'idle', state === 'loading', state === 'success', state === 'error']}>
          <div className="p-4 bg-gray-100 border rounded">
            <p className="text-gray-700">📭 Idle - Ready to start</p>
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
        </RenderSwitch>
      </div>
    </section>
  );
}
