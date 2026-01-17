import { RenderList } from '@jswork/react-render-controls/src/main';
import { mockUsers } from '../data';

export function WithIndexExample() {
  return (
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
  );
}
