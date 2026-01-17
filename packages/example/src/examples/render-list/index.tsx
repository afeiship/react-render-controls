import React from 'react';
import { RenderList } from '@jswork/react-render-controls/src/main';
import UserCard from './UserCard';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const mockUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'User' },
];

function RenderListExample() {
  return (
    <div className="space-y-8">
      {/* Function style */}
      <section>
        <h2 className="mb-4 text-xl font-bold">Function Style</h2>
        <RenderList
          items={mockUsers}
          render={(user) => <UserCard user={user} />}
          keyBy="id"
        />
      </section>

      {/* Component style */}
      <section>
        <h2 className="mb-4 text-xl font-bold">Component Style (Compact)</h2>
        <RenderList
          items={mockUsers}
          render={{
            component: UserCard,
            dataKey: 'user',
            props: { variant: 'compact' },
          }}
          keyBy="id"
        />
      </section>

      {/* With index */}
      <section>
        <h2 className="mb-4 text-xl font-bold">With Index</h2>
        <RenderList
          items={mockUsers}
          render={(user, index) => (
            <div className="p-3 mb-2 bg-white border rounded shadow-sm">
              <span className="mr-2 font-bold text-blue-600">#{index + 1}</span>
              <span>{user.name}</span>
            </div>
          )}
        />
      </section>

      {/* With items */}
      <section>
        <h2 className="mb-4 text-xl font-bold">With Items (Total Count)</h2>
        <RenderList
          items={mockUsers}
          render={(user, index, items) => (
            <div className="p-3 mb-2 bg-white border rounded shadow-sm">
              <span className="mr-2 text-sm text-gray-500">
                {index + 1} / {items.length}
              </span>
              <span className="font-medium">{user.name}</span>
            </div>
          )}
        />
      </section>
    </div>
  );
}

export default RenderListExample;
