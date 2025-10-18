import { ColorResponse } from "../services/requests/Pets/types";

export function formatWhatsappPhoneNumber(phoneNumber: string) {
  return phoneNumber.replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "");
}

export function formatColorNames(colors: ColorResponse[]) {
  let text: string = "";
  colors.forEach((color, idx) => {
    if (idx !== colors.length - 1 && idx !== colors.length - 2) {
      text += `${color.name}, `;
    } else if (idx === colors.length - 2) {
      text += `${color.name} e `;
    } else {
      text += color.name;
    }
  });

  return text;
}

export const customClassNameFormatter = (className?: string) => {
  if (!className) {
    return "";
  }

  const values = className.split(" ");
  return values.map((value) => `!${value}`);
};

export const bytesFormatter = (bytes: number) => {
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }

  // Round to 2 decimal places if number has decimals
  const formatted = Number.isInteger(value) ? value : value.toFixed(2);

  return `${formatted} ${units[unitIndex]}`;
};
