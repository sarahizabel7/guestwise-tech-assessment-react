import { useEffect, useState } from "react";
import { getRestaurantDetails } from "../services/api";
import { RestaurantDetailsData } from "../types";

const useRestaurantDetails = (restaurantId?: number) => {
  const [restaurantDetails, setRestaurantDetails] =
    useState<RestaurantDetailsData>();

  useEffect(() => {
    if (!restaurantId) return;

    const fetchRestaurantDetails = async () => {
      const response = await getRestaurantDetails(restaurantId);
      setRestaurantDetails(response.details);
    };

    fetchRestaurantDetails();
  }, [restaurantId]);

  return { restaurantDetails };
};

export { useRestaurantDetails };
