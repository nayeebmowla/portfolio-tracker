export function toMoney(value) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return typeof value === "number" ? formatter.format(value) : value;
}

export function toPercent(value) {
  return `${value.toFixed(2)}%`;
}
