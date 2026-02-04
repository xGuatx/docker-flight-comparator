import type { Flight, SearchParams } from '../types';
import { format } from 'date-fns';

export const generateMockFlights = async (params: SearchParams): Promise<Flight[]> => {
    try {
        const queryParams = new URLSearchParams({
            origin: params.origin,
            destination: params.destination,
            departureDate: format(params.departureDate, 'yyyy-MM-dd'),
            oneWay: String(params.oneWay),
            flexible: String(params.flexibleDates)
        });

        if (!params.oneWay && params.returnDate) {
            queryParams.append('returnDate', format(params.returnDate, 'yyyy-MM-dd'));
        }

        const response = await fetch(`/api/search?${queryParams.toString()}`);

        if (!response.ok) {
            throw new Error('API Request Failed');
        }

        const data = await response.json();

        // Transform Amadeus API response to our Flight interface
        // Note: This is a simplified mapping. Real Amadeus structure is complex (Dictionaries + Data)
        if (!Array.isArray(data)) {
            console.warn('API returned non-array:', data);
            return [];
        }

        return data.map((offer: any) => {
            const outboundItinerary = offer.itineraries[0];
            const outboundSegments = outboundItinerary.segments;
            const outFirst = outboundSegments[0];
            const outLast = outboundSegments[outboundSegments.length - 1]; // Correct destination is arrival of LAST segment

            // Safe duration parsing
            const parseDuration = (d: string) => d ? d.replace('PT', '').toLowerCase() : '';

            // Construct a deep link (Mock or real if available)
            // Amadeus Self-Service API keeps links in dictionaries or separate call, but often omitted in simple search.
            // We'll create a generic Skyscanner search link for UX demo purposes.
            const skyScannerLink = `https://www.skyscanner.com/transport/flights/${outFirst.departure.iataCode.toLowerCase()}/${outLast.arrival.iataCode.toLowerCase()}/${format(new Date(outFirst.departure.at), 'yyMMdd')}`;

            const flight: Flight = {
                id: offer.id,
                airline: outFirst.carrierCode,
                airlineLogo: `https://content.r9cdn.net/rimg/provider-logos/airlines/v/${outFirst.carrierCode}.png`,
                flightNumber: `${outFirst.carrierCode}${outFirst.number}`,
                departureTime: outFirst.departure.at,
                arrivalTime: outLast.arrival.at, // Use outLast for final destination
                origin: outFirst.departure.iataCode,
                destination: outLast.arrival.iataCode, // Use outLast for final destination
                price: parseFloat(offer.price.total),
                currency: offer.price.currency,
                stops: outboundSegments.length - 1,
                duration: parseDuration(outboundItinerary.duration),
                deepLink: skyScannerLink
            };

            // Handle Return Trip
            if (offer.itineraries[1]) {
                const returnItinerary = offer.itineraries[1];
                const returnSegments = returnItinerary.segments;
                const retFirst = returnSegments[0];
                const retLast = returnSegments[returnSegments.length - 1];

                flight.returnFlight = {
                    airline: retFirst.carrierCode,
                    flightNumber: `${retFirst.carrierCode}${retFirst.number}`,
                    departureTime: retFirst.departure.at,
                    arrivalTime: retLast.arrival.at,
                    duration: parseDuration(returnItinerary.duration),
                    stops: returnSegments.length - 1
                };

                // Append return date to link if round trip
                // Skyscanner format specific but this is a rough demo link
                flight.deepLink += `/${format(new Date(retFirst.departure.at), 'yyMMdd')}`;
            }

            return flight;
        });

    } catch (error) {
        console.error("Flight fetch error", error);
        return [];
    }
};
