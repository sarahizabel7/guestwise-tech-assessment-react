import { useEffect, useState } from "react";
import { getRestaurants } from "../services/api";
import { Restaurant } from "../types";

const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await getRestaurants();
      setRestaurants(response);
    };

    fetchRestaurants();
  }, []);

  return { restaurants };
};

export { useRestaurants };
