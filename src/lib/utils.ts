import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateAddress = (
  address: string,
  startLength = 6,
  endLength = 4
) => {
  if (address.length <= startLength + endLength) {
    return address;
  }
  const start = address.substring(0, startLength);
  const end = address.substring(address.length - endLength, address.length);
  return `${start}...${end}`;
};
