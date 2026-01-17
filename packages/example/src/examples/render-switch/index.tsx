import { BasicUsageExample } from './components/BasicUsageExample';
import { WithFallbackExample } from './components/WithFallbackExample';
import { DataFetchingExample } from './components/DataFetchingExample';

function RenderSwitchExample() {
  return (
    <div className="space-y-8">
      <BasicUsageExample />
      <WithFallbackExample />
      <DataFetchingExample />
    </div>
  );
}

export default RenderSwitchExample;
