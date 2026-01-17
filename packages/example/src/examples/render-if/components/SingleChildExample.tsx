import React, { useState } from 'react';
import { RenderIf } from '@jswork/react-render-controls/src/main';

export function SingleChildExample() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
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
  );
}
