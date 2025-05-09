const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// IP Geolocation API (using IPinfo.io as an example)
const ipinfoToken = 'aba17eb1039979';  // Replace with your IPinfo API token

// Serve static HTML (frontend)
app.use(express.static('public'));

// Get location of client (via IP)
app.get('/location', async (req, res) => {
    const ip = req.ip;  // Get the IP address of the client

    // Query the IPinfo API to get location details
    try {
        const response = await axios.get(`https://ipinfo.io/${ip}/json?token=${ipinfoToken}`);
        const location = response.data;
        res.json(location);
    } catch (error) {
        res.status(500).send("Error getting location data");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
