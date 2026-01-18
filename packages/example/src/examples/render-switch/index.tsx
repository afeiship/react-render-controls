import { BasicUsageExample } from './components/BasicUsageExample';
import { WithFallbackExample } from './components/WithFallbackExample';
import { DataFetchingExample } from './components/DataFetchingExample';
import { MultipleMatchesExample } from './components/MultipleMatchesExample';

function RenderSwitchExample() {
  return (
    <div className="space-y-8">
      <BasicUsageExample />
      <WithFallbackExample />
      <DataFetchingExample />
      <MultipleMatchesExample />
    </div>
  );
}

export default RenderSwitchExample;
