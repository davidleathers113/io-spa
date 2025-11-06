import './features/io/IoForm';
import IoForm from './features/io/IoForm';

function App() {
  return (
    <div className="bg-red-500 bg-gray-100 min-h-screen font-sans text-gray-800">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Insertion Order</h1>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        <IoForm />
      </main>
      <footer className="text-center text-sm text-gray-500 p-4">
        <p>Powered by EvolveTech Innovations</p>
      </footer>
    </div>
  );
}

export default App;