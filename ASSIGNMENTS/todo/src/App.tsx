import './App.css';
import TodoApp from './components/TodoApp';

function App() {
  return (
    <div className="App">
        <div className='min-h-screen bg-gray-100 p-6'>
          <div className='max-w-2xl mx-auto bg-white shadow-md rounded-lg p-4'>
            <TodoApp />
          </div>
        </div>
    </div>
  );
}

export default App;
