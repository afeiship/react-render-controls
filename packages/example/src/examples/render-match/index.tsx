import { BasicUsageExample } from './components/BasicUsageExample';
import { MultipleValuesExample } from './components/MultipleValuesExample';
import { OrderStatusExample } from './components/OrderStatusExample';

function RenderMatchExample() {
  return (
    <div className="space-y-8">
      <BasicUsageExample />
      <MultipleValuesExample />
      <OrderStatusExample />
    </div>
  );
}

export default RenderMatchExample;
