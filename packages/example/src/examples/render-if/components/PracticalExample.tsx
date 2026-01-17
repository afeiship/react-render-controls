import React, { useState } from 'react';
import { RenderIf } from '@jswork/react-render-controls/src/main';

export function PracticalExample() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Practical Example</h2>
      <div className="p-4 bg-white rounded shadow">
        <RenderIf when={isLoggedIn}>
          <div className="space-y-2">
            <div className="p-3 bg-gray-100 rounded">
              <strong>Dashboard</strong>
              <p className="text-sm text-gray-600">View your analytics and reports</p>
            </div>
            <div className="p-3 bg-gray-100 rounded">
              <strong>Profile</strong>
              <p className="text-sm text-gray-600">Manage your account settings</p>
            </div>
          </div>
          <div className="p-4 bg-yellow-50 border rounded border-yellow-200">
            <p className="text-yellow-800">Please log in to access this feature.</p>
            <button
              className="mt-2 px-4 py-1 text-yellow-800 bg-yellow-200 rounded hover:bg-yellow-300"
              onClick={() => setIsLoggedIn(true)}
            >
              Login
            </button>
          </div>
        </RenderIf>
        {!isLoggedIn && (
          <button
            className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => setIsLoggedIn(true)}
          >
            Demo Login
          </button>
        )}
      </div>
    </section>
  );
}
