import { useState } from 'react';
import { SearchForm } from './components/SearchForm';
import { FlightCard } from './components/FlightCard';
import { generateMockFlights } from './services/mockFlights';
import type { Flight, SearchParams } from './types';
import { Plane } from 'lucide-react';

function App() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleSearch = async (params: SearchParams) => {
    setLoading(true);
    setHasSearched(true);

    const results = await generateMockFlights(params);
    setFlights(results);
    setLoading(false);
  };

  // Group flights by date if needed, or just list them.
  // Implementation choice: Simple list for now.

  return (
    <div className="min-h-screen bg-slate-50 relative selection:bg-blue-200">

      {/* Background Graphic */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-100 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-indigo-100 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-pink-100 blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">

        {/* Header */}
        <header className="mb-12 text-center pt-8">
          <div className="inline-flex items-center justify-center p-3 bg-white/50 backdrop-blur-sm rounded-2xl mb-4 shadow-sm">
            <Plane className="text-blue-600 mr-2" fill="currentColor" size={24} />
            <span className="font-bold text-slate-800 tracking-tight">SkyScanner Elite</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
            Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Premium</span> Flights<br />
            You Deserve.
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Exclusive deals on top-tier airlines. Currently featuring special rates for Paris — Tokyo.
          </p>
        </header>

        {/* Search */}
        <div className="mb-16">
          <SearchForm onSearch={handleSearch} />
        </div>

        {/* Results */}
        <div className="space-y-6">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
              <p className="text-slate-400 font-medium animate-pulse">Searching best flights...</p>
            </div>
          )}

          {!loading && hasSearched && flights.length === 0 && (
            <div className="text-center py-20 bg-white/50 rounded-3xl border border-slate-100">
              <p className="text-slate-500 text-lg">No flights found for these dates. Try being more flexible.</p>
            </div>
          )}

          {!loading && flights.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center justify-between mb-6 px-2">
                <h2 className="text-2xl font-bold text-slate-800">Available Flights</h2>
                <span className="text-sm font-semibold text-slate-500 bg-slate-200 px-3 py-1 rounded-full">{flights.length} results</span>
              </div>
              <div className="grid gap-4">
                {flights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default App
