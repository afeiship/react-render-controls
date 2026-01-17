import React, { useState } from 'react';
import { RenderSwitch } from '@jswork/react-render-controls/src/main';

type UserRole = 'admin' | 'moderator' | 'user' | 'guest';

export function WithFallbackExample() {
  const [role, setRole] = useState<UserRole>('guest');

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">With Fallback</h2>
      <div className="p-4 mb-4 bg-white rounded shadow">
        <div className="flex gap-2 mb-4">
          {(['admin', 'moderator', 'user', 'guest'] as UserRole[]).map((r) => (
            <button
              key={r}
              className={`px-4 py-2 rounded capitalize ${
                role === r
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setRole(r)}
            >
              {r}
            </button>
          ))}
        </div>

        <RenderSwitch
          cases={[role === 'admin', role === 'moderator']}
          fallback={
            <div className="p-4 bg-yellow-50 border rounded border-yellow-200">
              <p className="text-yellow-800">
                ⚠️ Access denied. You are logged in as <strong>{role}</strong>.
                Admin or moderator privileges required.
              </p>
            </div>
          }
        >
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <h3 className="font-semibold text-red-800">Admin Panel</h3>
            <p className="text-sm text-red-700">Full system access and settings.</p>
          </div>
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <h3 className="font-semibold text-blue-800">Moderator Panel</h3>
            <p className="text-sm text-blue-700">Content moderation and user management.</p>
          </div>
        </RenderSwitch>
      </div>
    </section>
  );
}
