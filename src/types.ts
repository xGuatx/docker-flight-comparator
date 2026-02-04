export interface Flight {
    id: string;
    airline: string;
    airlineLogo: string;
    flightNumber: string;
    price: number;
    currency: string;

    // Outbound
    departureTime: string;
    arrivalTime: string;
    origin: string;
    destination: string;
    duration: string;
    stops: number;

    // Return (Optional)
    returnFlight?: {
        airline: string;
        flightNumber: string;
        departureTime: string;
        arrivalTime: string;
        duration: string;
        stops: number;
    },
    deepLink?: string;
}

export interface SearchParams {
    origin: string;
    destination: string;
    departureDate: Date;
    returnDate?: Date;
    oneWay: boolean;
    flexibleDates: boolean; // +/- 3 days
}
