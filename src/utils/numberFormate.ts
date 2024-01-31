const numberFormate = new Intl.NumberFormat("en-UK", {
  notation: "compact",
  maximumFractionDigits: 2,
}).format;

export default numberFormate;
