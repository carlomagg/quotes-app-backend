// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Endpoint to fetch a random quote
app.get('/quote', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    const quoteData = response.data[0]; // ZenQuotes returns an array
    const quote = {
      content: quoteData.q, // Quote text
      author: quoteData.a   // Author
    };
    res.json(quote);
  } catch (error) {
    console.error('Error fetching quote from ZenQuotes API:', error);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
