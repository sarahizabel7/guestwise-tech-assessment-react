import { render, screen, waitFor } from "@testing-library/react";
import RestaurantsProvider, {
  RestaurantsContext,
} from "../RestaurantsProvider";
import { getRestaurants, getRestaurantDetails } from "../../services/api";
import { Restaurant } from "../../types";
import { useContext } from "react";

jest.mock("../../services/api");

const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Restaurant A",
    cuisine: "Cuisine A",
    rating: 4.5,
    shortDescription: "Description A",
  },
  {
    id: 2,
    name: "Restaurant B",
    cuisine: "Cuisine B",
    rating: 4.0,
    shortDescription: "Description B",
  },
];

const MockedComponent = () => {
  const { restaurants, selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  return (
    <div>
      <h1>Restaurants</h1>
      <div data-testid="restaurant-count">Count: {restaurants.length}</div>
      {selectedRestaurant && (
        <div data-testid="selected-restaurant">{selectedRestaurant.name}</div>
      )}
      <button onClick={() => setSelectedRestaurant(mockRestaurants[0])}>
        Select Restaurant
      </button>
    </div>
  );
};

describe("RestaurantsProvider", () => {
  beforeEach(() => {
    (getRestaurants as jest.Mock).mockResolvedValue(mockRestaurants);

    (getRestaurantDetails as jest.Mock).mockResolvedValue({
      details: {
        contactEmail: "test@restaurant.com",
        address: "Address A",
        openingHours: { weekday: "Weekday A", weekend: "Weekend A" },
        reviewScore: 4.5,
      },
    });
  });

  test("fetches and displays restaurants", async () => {
    render(
      <RestaurantsProvider>
        <MockedComponent />
      </RestaurantsProvider>
    );

    expect(screen.getByText(/restaurants/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("restaurant-count")).toHaveTextContent(
        "Count: 2"
      );
    });
  });

  test("updates the selected restaurant", async () => {
    render(
      <RestaurantsProvider>
        <MockedComponent />
      </RestaurantsProvider>
    );

    const button = screen.getByRole("button", { name: /select restaurant/i });
    button.click();

    await waitFor(() => {
      expect(screen.getByTestId("selected-restaurant")).toHaveTextContent(
        "Restaurant A"
      );
    });
  });
});
