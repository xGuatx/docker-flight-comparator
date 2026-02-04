import { useState } from 'react';
import type { SearchParams } from '../types';
import { Calendar, MapPin, Search, ArrowRightLeft, CalendarDays } from 'lucide-react';
import { cn } from '../lib/utils';

interface SearchFormProps {
    onSearch: (params: SearchParams) => void;
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
    const [params, setParams] = useState<SearchParams>({
        origin: 'PAR',
        destination: 'TYO',
        departureDate: new Date('2026-03-03'),
        returnDate: new Date('2026-03-04'), // Default to the requested date
        oneWay: true, // Default: one-way trip without return
        flexibleDates: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(params);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                {/* Trip Type Tabs */}
                <div className="flex gap-4 mb-6">
                    <button
                        type="button"
                        onClick={() => setParams({ ...params, oneWay: true })}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-semibold transition-all",
                            params.oneWay ? "bg-slate-900 text-white shadow-lg" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        )}
                    >
                        One Way
                    </button>
                    <button
                        type="button"
                        onClick={() => setParams({ ...params, oneWay: false })}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-semibold transition-all",
                            !params.oneWay ? "bg-slate-900 text-white shadow-lg" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        )}
                    >
                        Round Trip
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Origins & Destination */}
                    <div className="md:col-span-5 grid grid-cols-[1fr,auto,1fr] gap-2 items-center bg-slate-50 border border-slate-200 p-2 rounded-2xl">
                        <div className="flex items-center px-3">
                            <MapPin className="text-slate-400 mr-2" size={18} />
                            <div className="flex flex-col">
                                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">From</label>
                                <input
                                    type="text"
                                    value={params.origin}
                                    onChange={(e) => setParams({ ...params, origin: e.target.value.toUpperCase() })}
                                    className="bg-transparent font-bold text-slate-800 outline-none w-full placeholder:text-slate-300"
                                    placeholder="PAR"
                                />
                            </div>
                        </div>

                        <button type="button" className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow text-slate-400">
                            <ArrowRightLeft size={16} />
                        </button>

                        <div className="flex items-center px-3">
                            <MapPin className="text-slate-400 mr-2" size={18} />
                            <div className="flex flex-col">
                                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">To</label>
                                <input
                                    type="text"
                                    value={params.destination}
                                    onChange={(e) => setParams({ ...params, destination: e.target.value.toUpperCase() })}
                                    className="bg-transparent font-bold text-slate-800 outline-none w-full placeholder:text-slate-300"
                                    placeholder="TYO"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="md:col-span-4 flex items-center bg-slate-50 border border-slate-200 p-2 rounded-2xl overflow-hidden">
                        <div className="flex items-center px-3 flex-1 border-r border-slate-200 min-w-0">
                            <Calendar className="text-slate-400 mr-2 shrink-0" size={18} />
                            <div className="flex flex-col w-full min-w-0">
                                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider truncate">Departure</label>
                                <input
                                    type="date"
                                    value={params.departureDate instanceof Date && !isNaN(params.departureDate.getTime()) ? params.departureDate.toISOString().split('T')[0] : ''}
                                    onChange={(e) => {
                                        const date = e.target.value ? new Date(e.target.value) : new Date();
                                        setParams({ ...params, departureDate: date });
                                    }}
                                    className="bg-transparent font-semibold text-slate-800 outline-none w-full text-sm p-0 border-none focus:ring-0"
                                />
                            </div>
                        </div>
                        {!params.oneWay && (
                            <div className="flex items-center px-3 flex-1 min-w-0">
                                <div className="flex flex-col w-full min-w-0">
                                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider truncate">Return</label>
                                    <input
                                        type="date"
                                        value={params.returnDate instanceof Date && !isNaN(params.returnDate.getTime()) ? params.returnDate.toISOString().split('T')[0] : ''}
                                        onChange={(e) => {
                                            const date = e.target.value ? new Date(e.target.value) : new Date();
                                            setParams({ ...params, returnDate: date });
                                        }}
                                        className="bg-transparent font-semibold text-slate-800 outline-none w-full text-sm p-0 border-none focus:ring-0"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Button */}
                    <div className="md:col-span-3">
                        <button type="submit" className="w-full h-full min-h-[60px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 transition-all active:scale-95">
                            <Search size={22} />
                            Search Flights
                        </button>
                    </div>
                </div>

                {/* Options */}
                <div className="mt-4 flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-colors", params.flexibleDates ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white")}>
                            {params.flexibleDates && <CheckIcon />}
                        </div>
                        <input
                            type="checkbox"
                            checked={params.flexibleDates}
                            onChange={(e) => setParams({ ...params, flexibleDates: e.target.checked })}
                            className="hidden"
                        />
                        <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                            <CalendarDays size={14} /> Flexible Dates (+/- 3 Days)
                        </span>
                    </label>
                </div>

            </div>
        </form>
    )
}

function CheckIcon() {
    return (
        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
    )
}
