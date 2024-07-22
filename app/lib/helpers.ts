import { Room } from "./types";

export const sortRooms = (
  rooms: Room[],
  sortKey: string,
  sortOrder: string,
): Room[] => {
  return [...rooms].sort((a, b) => {
    let comparison = 0;
    if (sortKey === "price") {
      // Handle null prices
      const priceA = a.price !== null ? a.price.value : Number.MAX_VALUE;
      const priceB = b.price !== null ? b.price.value : Number.MAX_VALUE;
      comparison = priceA - priceB;
    } else if (sortKey === "name") {
      comparison = a.name.localeCompare(b.name);
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });
};
