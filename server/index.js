import express from 'express';
import cors from 'cors';
import Amadeus from 'amadeus';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID || 'REPLACE_WITH_YOUR_KEY',
    clientSecret: process.env.AMADEUS_CLIENT_SECRET || 'REPLACE_WITH_YOUR_SECRET',
});

// Serve static files from the React app (dist)
app.use(express.static(path.join(__dirname, '../dist')));

async function searchFlights(amadeus, params) {
    try {
        const response = await amadeus.shopping.flightOffersSearch.get(params);
        return response.data;
    } catch (error) {
        // Silence errors to allow partial results
        return [];
    }
}

app.get('/api/search', async (req, res) => {
    const { origin, destination, departureDate, returnDate, oneWay, flexible } = req.query;

    try {
        if (!origin || !destination || !departureDate) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const datesToSearch = [departureDate];

        if (flexible === 'true') {
            // +/- 3 Days logic
            const baseDate = new Date(departureDate);
            for (let i = -3; i <= 3; i++) {
                if (i === 0) continue;
                const d = new Date(baseDate);
                d.setDate(baseDate.getDate() + i);
                datesToSearch.push(d.toISOString().split('T')[0]);
            }
        }

        const uniqueDates = [...new Set(datesToSearch)];

        const promises = uniqueDates.map(date => {
            const params = {
                originLocationCode: origin,
                destinationLocationCode: destination,
                departureDate: date,
                adults: '1',
                currencyCode: 'EUR',
                max: 5 // Limit max to avoid huge payload
            };
            if (oneWay !== 'true' && returnDate) {
                params.returnDate = returnDate;
            }
            return searchFlights(amadeus, params);
        });

        const results = await Promise.all(promises);
        const flatResults = results.flat();

        res.json(flatResults);
    } catch (error) {
        console.error('Amadeus API Error:', error);
        res.status(500).json({ error: 'Failed to fetch flights', context: error });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
