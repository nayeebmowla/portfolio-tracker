const yahooFinance = require("yahoo-finance2").default;

async function transformData(positions) {
  const transformedPositions = [];

  const usdToCad = await yahooFinance.quote("CAD=X");
  const usdToCadConversionRate = usdToCad.regularMarketPrice;

  for (const position of positions) {
    const { symbol, openQuantity, totalCost } = position;

    const startDate = new Date(
      new Date().setFullYear(new Date().getFullYear() - 1)
    )
      .toISOString()
      .split("T")[0];
    const endDate = new Date().toISOString().split("T")[0];

    let dividends;
    try {
      dividends = await yahooFinance.historical(symbol, {
        period1: startDate,
        period2: endDate,
        events: "dividends",
      });
    } catch (error) {
      dividends = [];
    }

    const quote = await yahooFinance.quote(symbol);
    const { regularMarketPrice, longName, currency } = quote;

    transformedPositions.push({
      stock: symbol,
      name: longName,
      shares: openQuantity,
      bookValue: totalCost,
      dividend: dividends[dividends.length - 1]?.dividends || 0,
      frequency: dividends.length,
      currentPrice: regularMarketPrice,
      currency,
    });
  }

  return { positions: transformedPositions, usdToCadConversionRate };
}

module.exports = transformData;
