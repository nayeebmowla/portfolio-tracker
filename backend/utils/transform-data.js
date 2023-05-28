const yahooFinance = require('yahoo-finance2').default;

const transformData = async (positions) => {
    const transformedPositions = [];

    for (const position of positions) {
        const { symbol, openQuantity, currentPrice, totalCost } = position;

        const startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0];
        const endDate = new Date().toISOString().split('T')[0];

        let dividends;
        try {
            dividends = await yahooFinance.historical(symbol, { period1: startDate, period2: endDate, events: "dividends" });
        } catch (error) {
            dividends = [];
        }

        const quote = await yahooFinance.quote(symbol);

        transformedPositions.push({
            symbol,
            name: quote.longName,
            shares: openQuantity,
            bookValue: totalCost,
            dividend: dividends[dividends.length - 1]?.dividends || 0,
            frequency: dividends.length,
            currentPrice
        });
    }

    return transformedPositions;
};

module.exports = transformData;