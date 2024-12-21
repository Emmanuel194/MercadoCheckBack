import { pricesData } from "../data/pricesData";

export const getAllPrices = () => {
  return pricesData;
};

export const getSortedPrices = (sortOrder: "asc" | "desc" = "asc") => {
  const sortedPrices = [...pricesData];
  return sortedPrices.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.precoMax - b.precoMax;
    }
    return b.precoMax - a.precoMax;
  });
};
