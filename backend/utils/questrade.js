const axios = require("axios");
const transformData = require("./transform-data");

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

async function fetchPositions(accessToken, apiServer, tokenType) {
  const accounts = await fetchAccounts(accessToken, apiServer, tokenType);
  const accountsWithPositions = [];
  for (const account of accounts) {
    const positionData = await fetchData(
      accessToken,
      apiServer,
      tokenType,
      `accounts/${account.number}/positions`
    );

    const formatted = await transformData(positionData.positions);

    accountsWithPositions.push({
      account: account.type,
      positions: formatted,
    });
  }

  return accountsWithPositions;
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
