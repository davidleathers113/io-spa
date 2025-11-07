import './features/io/IoForm';
import IoForm from './features/io/IoForm';

function App() {
  return (
    <div className="min-h-screen font-sans text-slate-800 bg-linear-to-b from-(--brand-bg-start) to-(--brand-bg-end) antialiased">
      <header className="sticky top-0 z-10 bg-white/80 supports-backdrop-filter:bg-white/60 backdrop-blur border-b border-(--brand-border) p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-slate-900">Insertion Order</h1>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        <IoForm />
      </main>
      <footer className="text-center text-sm text-slate-500 p-6">
        <p>Powered by NextWave Consulting</p>
      </footer>
    </div>
  );
}

export default App;