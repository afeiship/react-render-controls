import RenderListExample from './examples/render-list';
import '@jswork/react-render-controls/src/style.scss';

function App() {
  return (
    <div className="m-10 p-4 shadow bg-gray-100 text-gray-800 hover:shadow-md transition-all">
      <div className="badge badge-warning absolute right-0 top-0 m-4">
        Build Time: {BUILD_TIME}
      </div>
      <h1 className="mb-6 text-2xl font-bold">React Render Controls Examples</h1>
      <RenderListExample />
    </div>
  );
}

export default App;
