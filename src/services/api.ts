import { Restaurant } from "../types";

export const getRestaurants = async (): Promise<Restaurant[]> => {
  const response = await fetch("http://localhost:3001/restaurants");
  return response.json();
};

export const getRestaurantDetails = async (id: number): Promise<Restaurant> => {
  const response = await fetch(`http://localhost:3001/restaurants/${id}`);
  return response.json();
};
