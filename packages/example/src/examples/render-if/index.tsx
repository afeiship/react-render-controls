import { SingleChildExample } from './components/SingleChildExample';
import { TwoChildrenExample } from './components/TwoChildrenExample';
import { PracticalExample } from './components/PracticalExample';

function RenderIfExample() {
  return (
    <div className="space-y-8">
      <SingleChildExample />
      <TwoChildrenExample />
      <PracticalExample />
    </div>
  );
}

export default RenderIfExample;
