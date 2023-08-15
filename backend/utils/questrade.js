const axios = require('axios');

const fetchPositions = async (accessToken, apiServer, tokenType, accountType) => {
    const accountData = await fetchAccountData(accessToken, apiServer, tokenType, 'accounts');
    const account_id = accountData.accounts.find(account => account.type === accountType).number;
    const positionData = await fetchAccountData(accessToken, apiServer, tokenType, `accounts/${account_id}/positions`);
    return positionData.positions;
}

async function fetchAccountData(accessToken, apiServer, tokenType, endpoint) {
    const response = await axios.get(`${apiServer}v1/${endpoint}`, {
        headers: {
            Authorization: `${tokenType} ${accessToken}`
        }
    });

    return response.data;
}

module.exports = fetchPositions;
    