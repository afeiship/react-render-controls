import { RenderList } from '@jswork/react-render-controls/src/main';
import { mockUsers } from '../data';
import UserCard from '../UserCard';

export function FunctionStyleExample() {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Function Style</h2>
      <RenderList
        items={mockUsers}
        render={(user) => <UserCard user={user} />}
        keyBy="id"
      />
    </section>
  );
}
