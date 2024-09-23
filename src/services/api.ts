export const getRestaurants = async () => {
  const response = await fetch("http://localhost:3001/restaurants");
  return response.json();
};

export const getRestaurantDetails = async (id: number) => {
  const response = await fetch(`http://localhost:3001/restaurants/${id}`);
  return response.json();
};
