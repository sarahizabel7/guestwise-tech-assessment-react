import { createContext, useCallback, useEffect, useState } from "react";
import { getRestaurantDetails, getRestaurants } from "../services/api";
import { Restaurant } from "../types";

type RestaurantsContextType = {
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant: (restaurant: Restaurant) => void;
  restaurants: Restaurant[];
};

const noop = () => {};

const RestaurantsContext = createContext<RestaurantsContextType>({
  selectedRestaurant: null,
  setSelectedRestaurant: noop,
  restaurants: [],
});

const RestaurantsProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const setSelectedRestaurantFn = useCallback(
    async (restaurant: Restaurant) => {
      const response = await getRestaurantDetails(restaurant.id);
      restaurant.details = response.details;

      setSelectedRestaurant(restaurant);
    },
    []
  );

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await getRestaurants();

      setRestaurants(response);
    };

    fetchRestaurants();
  }, []);

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        selectedRestaurant,
        setSelectedRestaurant: setSelectedRestaurantFn,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};

export default RestaurantsProvider;
export { RestaurantsContext };
