import { RenderList } from '@jswork/react-render-controls/src/main';
import { mockUsers } from '../data';
import UserCard from '../UserCard';

export function ComponentStyleExample() {
  return (
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
  );
}
