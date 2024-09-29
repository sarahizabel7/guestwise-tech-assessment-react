import { getRestaurantDetails } from "../services/api";

const useRestaurantDetails = () => {
  const fetchRestaurantDetails = async (restaurantId: number) => {
    const response = await getRestaurantDetails(restaurantId);
    return response.details;
  };

  return { fetchRestaurantDetails };
};

export { useRestaurantDetails };
