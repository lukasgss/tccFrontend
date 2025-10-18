export function isNumber(str: string) {
  if (!str) {
    return false;
  }

  if (str === "Infinity" || str === "-Infinity") {
    return true;
  }

  return !Number.isNaN(str) && !Number.isNaN(parseFloat(str));
}

export function capitalizeEveryWord(str: string) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
