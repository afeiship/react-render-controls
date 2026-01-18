import React, { useState } from 'react';
import { RenderSwitch } from '@jswork/react-render-controls/src/main';

type Permission = 'read' | 'write' | 'delete' | 'admin';

export function MultipleMatchesExample() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [useMultiple, setUseMultiple] = useState(false);

  const togglePermission = (perm: Permission) => {
    setPermissions((prev) =>
      prev.includes(perm)
        ? prev.filter((p) => p !== perm)
        : [...prev, perm]
    );
  };

  const hasRead = permissions.includes('read');
  const hasWrite = permissions.includes('write');
  const hasDelete = permissions.includes('delete');
  const hasAdmin = permissions.includes('admin');

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">
        Multiple Matches Example
      </h2>
      <p className="mb-4 text-gray-600">
        This example demonstrates the difference between the default behavior
        (render only first match) and <code>multiple</code> (render all matches).
      </p>

      <div className="p-4 mb-4 bg-white rounded shadow">
        {/* Permission Toggles */}
        <div className="mb-4">
          <h3 className="mb-2 font-semibold">Select Permissions:</h3>
          <div className="flex flex-wrap gap-2">
            {(['read', 'write', 'delete', 'admin'] as Permission[]).map((perm) => (
              <button
                key={perm}
                className={`px-4 py-2 rounded capitalize ${
                  permissions.includes(perm)
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => togglePermission(perm)}
              >
                {perm}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useMultiple}
              onChange={(e) => setUseMultiple(e.target.checked)}
              className="w-4 h-4 text-indigo-600"
            />
            <span className="font-medium">
              Use <code>multiple</code>
            </span>
          </label>
          <p className="mt-1 text-sm text-gray-500">
            {useMultiple
              ? 'All matching permissions will be displayed'
              : 'Only the first matching permission will be displayed'}
          </p>
        </div>

        {/* RenderSwitch Demo */}
        <div className="p-4 bg-gray-50 border rounded border-gray-200">
          <h3 className="mb-3 font-semibold">
            Current Mode: <span className="text-indigo-600">{useMultiple ? 'multiple (All Matches)' : 'Default (First Match Only)'}</span>
          </h3>

          <RenderSwitch
            cases={[hasAdmin, hasDelete, hasWrite, hasRead]}
            multiple={useMultiple}
            fallback={
              <div className="p-4 bg-yellow-50 border rounded border-yellow-200">
                <p className="text-yellow-800">
                  ⚠️ No permissions selected. Select at least one permission above.
                </p>
              </div>
            }
          >
            <div className="p-3 mb-2 bg-red-50 border-l-4 border-red-500 rounded">
              <div className="flex items-center gap-2">
                <span className="text-xl">👑</span>
                <div>
                  <p className="font-semibold text-red-800">Admin Access</p>
                  <p className="text-sm text-red-700">Full system control and user management</p>
                </div>
              </div>
            </div>

            <div className="p-3 mb-2 bg-orange-50 border-l-4 border-orange-500 rounded">
              <div className="flex items-center gap-2">
                <span className="text-xl">🗑️</span>
                <div>
                  <p className="font-semibold text-orange-800">Delete Permission</p>
                  <p className="text-sm text-orange-700">Can delete content and resources</p>
                </div>
              </div>
            </div>

            <div className="p-3 mb-2 bg-blue-50 border-l-4 border-blue-500 rounded">
              <div className="flex items-center gap-2">
                <span className="text-xl">✏️</span>
                <div>
                  <p className="font-semibold text-blue-800">Write Permission</p>
                  <p className="text-sm text-blue-700">Can create and edit content</p>
                </div>
              </div>
            </div>

            <div className="p-3 mb-2 bg-green-50 border-l-4 border-green-500 rounded">
              <div className="flex items-center gap-2">
                <span className="text-xl">👁️</span>
                <div>
                  <p className="font-semibold text-green-800">Read Permission</p>
                  <p className="text-sm text-green-700">Can view content only</p>
                </div>
              </div>
            </div>
          </RenderSwitch>
        </div>

        {/* Current State Display */}
        <div className="mt-4 p-3 bg-white border rounded">
          <h4 className="mb-2 text-sm font-semibold">Current State:</h4>
          <div className="text-sm font-mono bg-gray-100 p-2 rounded">
            <div>permissions: [{permissions.join(', ') || 'none'}]</div>
            <div>cases: [{String(hasAdmin)}, {String(hasDelete)}, {String(hasWrite)}, {String(hasRead)}]</div>
            <div>multiple: {String(useMultiple)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
