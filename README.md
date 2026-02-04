# Docker Flight Comparator

Modern flight comparison web application built with React, TypeScript, and the Amadeus API.

## Description

A premium flight search and comparison tool featuring a sleek UI, flexible search options, and integration with the Amadeus flight search API. This is a test/demo project showcasing modern web development practices.

## Features

- **Flight Search** - Search flights by origin, destination, and dates
- **Flexible Dates** - +/- 3 days date flexibility
- **One-way & Round-trip** - Support for both trip types
- **Price Comparison** - Compare prices across multiple airlines
- **Modern UI** - Beautiful, responsive design with Tailwind CSS
- **Detailed Results** - View flight details, stops, duration, and pricing
- **Fast Performance** - Built with Vite for optimal dev experience

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS + Lucide Icons
- **API**: Amadeus Flight Search API
- **Backend**: Express.js (API proxy)
- **Deployment**: Docker + Docker Compose

## Prerequisites

- Node.js 18+ (for local development)
- Docker & Docker Compose (for containerized deployment)
- Amadeus API credentials (optional - uses mock data by default)

## Installation

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker Deployment

```bash
# Build and start containers
docker-compose up -d

# Stop containers
docker-compose down
```

Access the application at `http://localhost:5173` (dev) or `http://localhost:3000` (Docker).

## Configuration

### Amadeus API (Optional)

To use real flight data instead of mock data:

1. Create an account at [Amadeus for Developers](https://developers.amadeus.com/)
2. Create a new application to get your API credentials
3. Create a `.env` file in the project root:

```env
AMADEUS_CLIENT_ID=your_client_id_here
AMADEUS_CLIENT_SECRET=your_client_secret_here
```

4. Update the flight service to use the Amadeus API instead of mock data

## Usage

### Search Flights

1. Enter **origin** and **destination** airports (IATA codes)
2. Select **departure date** (and return date for round-trip)
3. Choose **one-way** or **round-trip**
4. Enable **flexible dates** for +/- 3 days search
5. Click **Search Flights**

### Example Searches

- **Paris to Tokyo**: `CDG` -> `NRT`
- **New York to London**: `JFK` -> `LHR`
- **Los Angeles to Sydney**: `LAX` -> `SYD`

## Project Structure

```
docker-flight-comparator/
|-- src/
|   |-- components/         # React components
|   |   |-- SearchForm.tsx  # Flight search form
|   |   +-- FlightCard.tsx  # Flight result card
|   |-- services/           # API services
|   |   +-- mockFlights.ts  # Mock data generator
|   |-- lib/                # Utilities
|   |-- types.ts            # TypeScript types
|   |-- App.tsx             # Main app component
|   +-- main.tsx            # Entry point
|-- server/                 # Express backend (optional)
|-- public/                 # Static assets
|-- docker-compose.yml      # Docker orchestration
|-- Dockerfile              # Docker build config
+-- package.json            # Dependencies
```

## Development

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

### Adding Real API Integration

Replace the mock data service in `src/services/mockFlights.ts` with actual Amadeus API calls:

```typescript
import Amadeus from 'amadeus';

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

export async function searchFlights(params: SearchParams) {
  const response = await amadeus.shopping.flightOffersSearch.get({
    originLocationCode: params.origin,
    destinationLocationCode: params.destination,
    departureDate: params.departureDate,
    adults: 1
  });

  return response.data;
}
```

## Docker Configuration

The application includes a full Docker setup for easy deployment:

- **Frontend**: Vite dev server or production build
- **Backend**: Express.js API proxy (optional)
- **Volume mounting**: For hot-reload during development

## Testing Notes

This project is designed as a test/demonstration application and is **not intended for production use**. Key considerations:

- Mock data is used by default
- No authentication or user management
- No booking functionality
- API rate limits not handled
- No error tracking or analytics

## Future Improvements

- [ ] Real-time price tracking
- [ ] User accounts and saved searches
- [ ] Email price alerts
- [ ] Multi-city search support
- [ ] Hotel and car rental integration
- [ ] Mobile app (React Native)
- [ ] Advanced filters (cabin class, airlines, etc.)

## Troubleshooting

**Port already in use:**
```bash
# Change port in vite.config.ts or docker-compose.yml
```

**Amadeus API errors:**
```bash
# Verify API credentials in .env
# Check API quota limits
# Ensure correct endpoint URLs
```

**Build errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Resources

- [Amadeus API Documentation](https://developers.amadeus.com/self-service)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## License

Personal project - Test/Demo use

---

**Note**: This is a demonstration project built for testing purposes. Not intended for production deployment or commercial use.
