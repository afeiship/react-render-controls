import React, { useState } from 'react';
import { RenderIf } from '@jswork/react-render-controls/src/main';

export function TwoChildrenExample() {
  const [hasPermission, setHasPermission] = useState(false);

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Two Children (If/Else)</h2>
      <div className="p-4 mb-4 bg-white rounded shadow">
        <button
          className="px-4 py-2 mb-4 text-white bg-purple-500 rounded hover:bg-purple-600"
          onClick={() => setHasPermission(!hasPermission)}
        >
          Toggle Permission: {hasPermission ? 'Granted' : 'Denied'}
        </button>
        <RenderIf when={hasPermission}>
          <div className="p-4 bg-green-100 border rounded border-green-300">
            <h3 className="font-semibold text-green-800">Access Granted</h3>
            <p className="text-green-700">You have permission to view this content.</p>
          </div>
          <div className="p-4 bg-red-100 border rounded border-red-300">
            <h3 className="font-semibold text-red-800">Access Denied</h3>
            <p className="text-red-700">You do not have permission to view this content.</p>
          </div>
        </RenderIf>
      </div>
    </section>
  );
}
