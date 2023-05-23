const axios = require('axios');

const server_url = 'https://login.questrade.com/oauth2/token?grant_type=refresh_token&refresh_token='; // TODO encode

// GET request for remote image in node.js
const fetchPositions = async (api_token) => {
    const { access_token, api_server, refresh_token, token_type } = await fetchAuthTokens(api_token);
    console.log('Refresh token: ' + refresh_token);

    const accountData = await fetchAccountData(api_server, token_type, access_token, 'accounts');
    const account_id = accountData.accounts.find(account => account.type === 'TFSA').number;

    const positionData = await fetchAccountData(api_server, token_type, access_token, `accounts/${account_id}/positions`);
    return positionData.positions;
}

async function fetchAuthTokens(api_token) {
    const response = await axios.get(`${server_url}${api_token}`);
    return response.data;
  }

async function fetchAccountData(api_server, token_type, access_token, endpoint) {
    const response = await axios.get(`${api_server}v1/${endpoint}`, {
        headers: {
            Authorization: `${token_type} ${access_token}`
        }
    });

    return response.data;
}

module.exports = fetchPositions;
    