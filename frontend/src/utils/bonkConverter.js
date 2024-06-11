export function formatNumber(number) {
    if (number >= 1000000000) {
      return (number / 1000000000).toFixed(2) + " Billion";
    } else if (number >= 1000000) {
      return (number / 1000000).toFixed(2) + " Million";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(2) + "K";
    } else {
      return number.toString();
    }
  }