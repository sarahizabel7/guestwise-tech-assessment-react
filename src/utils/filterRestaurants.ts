import { Restaurant } from "../types";

type Sort = "rating" | "name";

const sortByNumber = (numberA: number, numberB: number) => {
  return numberB - numberA;
};

const sortRestaurants = (sortedBy: Sort) => {
  return (restaurantA: Restaurant, restaurantB: Restaurant) => {
    if (sortedBy === "rating") {
      return sortByNumber(restaurantA.rating, restaurantB.rating);
    } else {
      return sortByName(restaurantA.name, restaurantB.name);
    }
  };
};

const sortByName = (nameA: string, nameB: string) => {
  const [textA, numA] = nameA.split(" ");
  const [textB, numB] = nameB.split(" ");

  // Compare the text part first
  if (textA !== textB) return textA.localeCompare(textB);

  // Compare the numeric part
  return parseInt(numA) - parseInt(numB);
};

const filterRestaurants = (filterValue: string) => {
  return (restaurant: Restaurant) => {
    return restaurant.name.toLowerCase().includes(filterValue.toLowerCase());
  };
};

export { sortRestaurants, filterRestaurants };
export type { Sort };
