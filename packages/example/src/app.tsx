import RenderListExample from './examples/render-list';
import RenderIfExample from './examples/render-if';
import RenderMatchExample from './examples/render-match';
import RenderSwitchExample from './examples/render-switch';
import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('render-list');

  return (
    <div className="m-10 p-4 shadow bg-gray-100 text-gray-800 hover:shadow-md transition-all">
      <div className="badge badge-warning absolute right-0 top-0 m-4">
        Build Time: {BUILD_TIME}
      </div>
      <h1 className="mb-6 text-2xl font-bold">React Render Controls Examples</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'render-list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('render-list')}
        >
          RenderList
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'render-if' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('render-if')}
        >
          RenderIf
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'render-match' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('render-match')}
        >
          RenderMatch
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'render-switch' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('render-switch')}
        >
          RenderSwitch
        </button>
      </div>

      {/* Content */}
      {activeTab === 'render-list' && <RenderListExample />}
      {activeTab === 'render-if' && <RenderIfExample />}
      {activeTab === 'render-match' && <RenderMatchExample />}
      {activeTab === 'render-switch' && <RenderSwitchExample />}
    </div>
  );
}

export default App;
