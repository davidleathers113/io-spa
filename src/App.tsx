import './features/io/IoForm';
import IoForm from './features/io/IoForm';

function App() {
  return (
    <div className="min-h-screen font-sans text-slate-800 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100 antialiased">
      <header className="sticky top-0 z-10 bg-white/80 supports-[backdrop-filter]:bg-white/60 backdrop-blur border-b border-slate-200 dark:bg-slate-900/60 dark:border-slate-800 p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Insertion Order</h1>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        <IoForm />
      </main>
      <footer className="text-center text-sm text-slate-500 dark:text-slate-400 p-6">
        <p>Powered by EvolveTech Innovations</p>
      </footer>
    </div>
  );
}

export default App;