import type { Flight } from '../types';
import { Clock, Plane, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface FlightCardProps {
    flight: Flight;
}

export const FlightCard = ({ flight }: FlightCardProps) => {
    return (
        <div className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-2xl p-6 hover:bg-white/95 dark:hover:bg-slate-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Airline Info */}
                <div className="flex items-center gap-4 w-full md:w-1/4">
                    <div className="bg-white p-2 rounded-xl shadow-sm">
                        <img src={flight.airlineLogo} alt={flight.airline} className="h-10 w-10 object-contain" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-800 dark:text-white">{flight.airline}</h3>
                        <p className="text-xs text-slate-500 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full inline-block">
                            {flight.flightNumber}
                        </p>
                    </div>
                </div>

                {/* Flight Path */}
                <div className="flex-1 w-full flex flex-col gap-6">
                    <FlightPath
                        depTime={flight.departureTime}
                        arrTime={flight.arrivalTime}
                        origin={flight.origin}
                        dest={flight.destination}
                        duration={flight.duration}
                        stops={flight.stops}
                        label="Outbound"
                    />

                    {flight.returnFlight && (
                        <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-2">
                            <FlightPath
                                depTime={flight.returnFlight.departureTime}
                                arrTime={flight.returnFlight.arrivalTime}
                                origin={flight.destination}
                                dest={flight.origin}
                                duration={flight.returnFlight.duration}
                                stops={flight.returnFlight.stops}
                                label="Return"
                            />
                        </div>
                    )}
                </div>

                {/* Price & Action */}
                <div className="w-full md:w-auto flex flex-row md:flex-col items-center justify-between md:justify-center gap-2 text-right border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 pt-4 md:pt-0 md:pl-6">
                    <div>
                        <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                            {flight.price}€
                        </p>
                        <p className="text-xs text-slate-500">total price</p>
                    </div>
                    <button
                        onClick={() => flight.deepLink ? window.open(flight.deepLink, '_blank') : alert(`Flight ${flight.flightNumber} selected! \nPrice: ${flight.price}€`)}
                        className="group mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-500/30 active:scale-95"
                    >
                        Select
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const FlightPath = ({ depTime, arrTime, origin, dest, duration, stops, label }: {
    depTime: string, arrTime: string, origin: string, dest: string, duration: string, stops: number, label?: string
}) => (
    <div className="flex items-center justify-between w-full text-slate-700 dark:text-slate-200">
        <div className="text-center w-20">
            {label && <span className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">{label}</span>}
            <p className="text-xl font-bold">{format(new Date(depTime), 'HH:mm')}</p>
            <p className="text-sm font-semibold text-slate-500">{origin}</p>
            <p className="text-xs text-slate-400">{format(new Date(depTime), 'dd MMM')}</p>
        </div>

        <div className="flex-1 flex flex-col items-center px-4 max-w-[200px] mx-auto">
            <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                <Clock size={12} /> {duration}
            </p>
            <div className="w-full flex items-center gap-2">
                <div className="h-[2px] w-full bg-slate-300 dark:bg-slate-700 relative">
                    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-1">
                        {stops > 0 && <div className="w-2 h-2 rounded-full bg-slate-400 mx-auto" />}
                    </div>
                </div>
                <Plane className="text-blue-500 rotate-90" size={20} />
            </div>
            <p className="text-xs text-slate-500 mt-1">
                {stops === 0 ? 'Direct' : `${stops} Stop`}
            </p>
        </div>

        <div className="text-center w-20">
            {label && <span className="block h-4 mb-1"></span>}
            <p className="text-xl font-bold">{format(new Date(arrTime), 'HH:mm')}</p>
            <p className="text-sm font-semibold text-slate-500">{dest}</p>
            <p className="text-xs text-slate-400">{format(new Date(arrTime), 'dd MMM')}</p>
        </div>
    </div>
);
