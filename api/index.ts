const express = require("express");
const axios = require('axios');
const app = express();
const cors = require("cors");

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get('/getOverlay', async (req, res) => {
    const url = 'https://cgpt-test2-fz08n.kinsta.app/SVG-Map/?svgUrl=https://campspot-production.s3.amazonaws.com/758a4a6a-8b15-4784-84b6-8fb1f2eb0c27&location=campsiteID_x5F__280_'; // Replace with the URL of the site you want to fetch

    try {
        const response = await axios.get(url);
        console.log('Response:', response.data);
        res.send(response.data); // Send the fetched HTML back to the client
    } catch (error) {
        console.error('Error fetching the external URL:', error);
        res.status(500).send('Failed to fetch the external content.');
    }
});

app.listen(3001, () => console.log("Server ready on port 3001."));

module.exports = app;
