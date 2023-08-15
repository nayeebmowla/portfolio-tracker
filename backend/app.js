const express = require('express');
const axios = require('axios');
const fetchPositions = require('./utils/questrade');
const transformData = require('./utils/transform-data');
require('dotenv').config();

// HTTPS
const https = require('https');
const fs = require('fs');
const options = {
    key: fs.readFileSync(process.env.KEY_PATH),
    cert: fs.readFileSync(process.env.CERT_PATH),
};

const app = express();
const port = process.env.PORT || 3000;
const redirect_uri = 'https://www.nayeeb-portfolio-tracker.com:3000/auth/callback/';

app.use(express.json());

// Redirect to Questrade authorization URL
app.get('/auth', (req, res) => {
    const authorizationUrl = `https://login.questrade.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${redirect_uri}`;
    res.redirect(authorizationUrl);
});

// Callback route to handle authorization response
app.get('/auth/callback', async (req, res) => {
    // Extract authorization code from the query parameter
    const authorizationCode = req.query.code;
    if(!authorizationCode) {
        return res.send({
            error: 'Authorization code must be provided.'
        })
    }

    try {
        const response = await axios.post(`https://login.questrade.com/oauth2/token?client_id=${process.env.CLIENT_ID}&code=${authorizationCode}&grant_type=authorization_code&redirect_uri=${redirect_uri}`);
        const { access_token: accessToken, api_server: apiServer, expires_in: expiresIn, refresh_token: refreshToken, token_type: tokenType } = response.data;
        const positions = await fetchPositions(accessToken, apiServer, tokenType, 'TFSA');
        const formatted = await transformData(positions);
        res.json(formatted);
    } catch (error) {
        console.error('Error making API call:', error);
        res.status(500).send('Error occurred');
    }
});

// HTTPS
var server = https.createServer(options, app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

async function refreshAccessToken(refreshToken) {
    const server_url = 'https://login.questrade.com/oauth2/token?grant_type=refresh_token&refresh_token=';
    const response = await axios.get(`${server_url}${refreshToken}`);
    return response.data;
}