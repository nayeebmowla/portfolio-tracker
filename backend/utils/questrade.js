const axios = require("axios");

async function fetchAccounts(accessToken, apiServer, tokenType) {
  const accountData = await fetchData(
    accessToken,
    apiServer,
    tokenType,
    "accounts"
  );
  return accountData.accounts.sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) {
      return -1; // a comes before b
    } else if (!a.isPrimary && b.isPrimary) {
      return 1; // b comes before a
    } else {
      return 0; // no change in order
    }
  });
}

async function fetchPositions(accessToken, apiServer, tokenType, accountType) {
  const accounts = await fetchAccounts(accessToken, apiServer, tokenType);
  const account_id = accounts.find(
    (account) => account.type === accountType
  ).number;
  const positionData = await fetchData(
    accessToken,
    apiServer,
    tokenType,
    `accounts/${account_id}/positions`
  );
  return positionData.positions;
}

async function fetchData(accessToken, apiServer, tokenType, endpoint) {
  const response = await axios.get(`${apiServer}v1/${endpoint}`, {
    headers: {
      Authorization: `${tokenType} ${accessToken}`,
    },
  });

  return response.data;
}

module.exports = { fetchAccounts, fetchPositions };
