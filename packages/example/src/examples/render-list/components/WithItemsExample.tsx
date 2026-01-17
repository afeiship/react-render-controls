import { RenderList } from '@jswork/react-render-controls/src/main';
import { mockUsers } from '../data';

export function WithItemsExample() {
  return (
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
  );
}
