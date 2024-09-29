import { useContext } from "react";
import { RestaurantsContext } from "../providers/RestaurantsProvider";

const useRestaurants = () => {
  return useContext(RestaurantsContext);
};

export { useRestaurants };
