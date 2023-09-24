const express = require("express");
const axios = require("axios");
const { fetchPositions } = require("./utils/questrade");
require("dotenv").config();

// SETUP EXPRESS
// HTTPS
const https = require("https");
const fs = require("fs");
const options = {
  key: fs.readFileSync(process.env.KEY_PATH),
  cert: fs.readFileSync(process.env.CERT_PATH),
};

const app = express();
const port = process.env.PORT || 3005;
const redirect_uri = `https://www.nayeeb-portfolio-tracker.com:${port}/api/auth/callback/`;

app.use(express.json());

// ROUTES
// Redirect route to Questrade authorization URL
app.get("/api/auth", (req, res) => {
  const authorizationUrl = `https://login.questrade.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${redirect_uri}`;
  res.redirect(authorizationUrl);
});

// Callback route to handle Questrade authorization response
app.get("/api/auth/callback", async (req, res) => {
  // Extract authorization code from the query parameter
  const authorizationCode = req.query.code;
  if (!authorizationCode) {
    return res.status(400).send("Authorization code must be provided.");
  }

  try {
    const response = await axios.post(
      `https://login.questrade.com/oauth2/token?client_id=${process.env.CLIENT_ID}&code=${authorizationCode}&grant_type=authorization_code&redirect_uri=${redirect_uri}`
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Token exchange failed.");
  }
});

// Route to refresh token
app.post("/api/refresh-token", async (req, res) => {
  const { refresh_token: refreshToken } = req.body;

  try {
    // Get a new access token
    const server_url =
      "https://login.questrade.com/oauth2/token?grant_type=refresh_token&refresh_token=";
    const response = await axios.get(`${server_url}${refreshToken}`);

    // Respond with the new access token data
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Token refresh failed.");
  }
});

// Route to get positions data
app.post("/api/positions", async (req, res) => {
  // Extract account type, token, server, and token type from the request body
  const {
    access_token: accessToken,
    api_server: apiServer,
    token_type: tokenType,
  } = req.body;

  if (!accessToken || !apiServer || !tokenType) {
    res.status(401).send("Please authenticate.");
  }

  try {
    const positions = await fetchPositions(accessToken, apiServer, tokenType);
    res.send(positions);
  } catch (error) {
    res.status(500).send("Getting positions failed.");
  }
});

// CREATE
// HTTPS
var server = https.createServer(options, app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
