const express = require("express");
const axios = require('axios');
const app = express();
const cors = require("cors");

app.use(cors()); // Enable CORS

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

app.get('/overlay', async (req, res) => {
    const url = 'https://cgpt-test2-fz08n.kinsta.app/SVG-Map/?svgUrl=https://campspot-production.s3.amazonaws.com/758a4a6a-8b15-4784-84b6-8fb1f2eb0c27&location=campsiteID_x5F__280_'; // Replace with the URL of the site you want to fetch

    try {
        const response = await axios.get(url);
        const fetchedContent = response.data; // Get the fetched HTML content

        const overlayPage = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Overlay Page</title>
                <style>
                    body {
                        margin: 0;
                        font-family: Arial, sans-serif;
                    }
                    #overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1000; /* High z-index to ensure it covers other content */
                    }

                    #overlayContent {
                        background: white;
                        padding: 20px;
                        border-radius: 10px;
                        width: 80%;
                        max-width: 500px;
                        text-align: center;
                    }
                </style>
                <script>
                    // JavaScript to close the overlay when clicking outside of it
                    document.addEventListener('DOMContentLoaded', (event) => {
                        const overlay = document.getElementById('overlay');
                        overlay.addEventListener('click', (e) => {
                            if (e.target === overlay) {
                                overlay.style.display = 'none';
                            }
                        });
                    });
                </script>
            </head>
            <body>
                <!-- Overlay container -->
                <div id="overlay">
                    <div id="overlayContent">${fetchedContent}</div>
                </div>
            </body>
            </html>
        `;
        res.send(overlayPage); // Send the combined overlay page
    } catch (error) {
        console.error('Error fetching the external URL:', error);
        res.status(500).send('Failed to fetch the external content.');
    }
});

app.listen(3001, () => console.log("Server ready on port 3001."));

module.exports = app;
