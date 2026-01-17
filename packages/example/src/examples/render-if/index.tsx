import React, { useState } from 'react';
import { RenderIf } from '@jswork/react-render-controls/src/main';

function RenderIfExample() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  return (
    <div className="space-y-8">
      {/* Single child example */}
      <section>
        <h2 className="mb-4 text-xl font-bold">Single Child (Show/Hide)</h2>
        <div className="p-4 mb-4 bg-white rounded shadow">
          <button
            className="px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => setIsLoggedIn(!isLoggedIn)}
          >
            Toggle Login State: {isLoggedIn ? 'Logged In' : 'Logged Out'}
          </button>
          <RenderIf when={isLoggedIn}>
            <div className="p-4 bg-green-100 border rounded border-green-300">
              <h3 className="font-semibold text-green-800">Welcome back!</h3>
              <p className="text-green-700">You are now logged in.</p>
            </div>
          </RenderIf>
        </div>
      </section>

      {/* Two children example (if/else) */}
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

      {/* Practical example */}
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
        </div>
      </section>
    </div>
  );
}

export default RenderIfExample;
