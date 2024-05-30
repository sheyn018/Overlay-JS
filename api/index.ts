const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const cors = require('cors');

// Enable All CORS Requests
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/getOverlay', async (req, res) => {
    const url = 'http://localhost:8000/chatbot.html'; // Replace with the URL of the site you want to fetch

    try {
        const response = await axios.get(url);
        res.send(response.data); // Send the fetched HTML back to the client
    } catch (error) {
        console.error('Error fetching the external URL:', error);
        res.status(500).send('Failed to fetch the external content.');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});