import { SingleChildExample } from './components/SingleChildExample';
import { TwoChildrenExample } from './components/TwoChildrenExample';
import { PracticalExample } from './components/PracticalExample';
import { MultipleConditionsExample } from './components/MultipleConditionsExample';

function RenderIfExample() {
  return (
    <div className="space-y-8">
      <SingleChildExample />
      <TwoChildrenExample />
      <MultipleConditionsExample />
      <PracticalExample />
    </div>
  );
}

export default RenderIfExample;
