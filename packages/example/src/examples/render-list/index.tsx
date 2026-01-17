import { FunctionStyleExample } from './components/FunctionStyleExample';
import { ComponentStyleExample } from './components/ComponentStyleExample';
import { WithIndexExample } from './components/WithIndexExample';
import { WithItemsExample } from './components/WithItemsExample';

function RenderListExample() {
  return (
    <div className="space-y-8">
      <FunctionStyleExample />
      <ComponentStyleExample />
      <WithIndexExample />
      <WithItemsExample />
    </div>
  );
}

export default RenderListExample;
