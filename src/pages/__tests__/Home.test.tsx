import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../Home";
import { useBookTable, useRestaurants } from "../../hooks";
import { Restaurant } from "../../types";

jest.mock("../../hooks", () => ({
  useRestaurants: jest.fn(),
  useBookTable: jest.fn(),
}));

const mockBookTable = jest.fn();

jest.mock("../../components/RestaurantList", () => {
  return jest.fn(({ restaurants, onRestaurantSelect }) => (
    <div>
      {restaurants.map((restaurant: Restaurant) => (
        <button
          key={restaurant.id}
          onClick={() => onRestaurantSelect(restaurant)}
        >
          {restaurant.name}
        </button>
      ))}
    </div>
  ));
});

jest.mock("../../components/RestaurantDetails", () => {
  return jest.fn(({ restaurant }) => <div>{restaurant.name} Details</div>);
});

jest.mock("../../components/BookTable", () => {
  return jest.fn(({ restaurant }) => (
    <div>Book a table at {restaurant.name}</div>
  ));
});

describe("Home Component", () => {
  const mockRestaurants: Restaurant[] = [
    {
      id: 1,
      name: "Restaurant A",
      cuisine: "Cuisine A",
      rating: 4.5,
      shortDescription: "Description A",
      details: {
        contactEmail: "test@restaurant.com",
        address: "Address A",
        openingHours: { weekday: "Weekday A", weekend: "Weekend A" },
        reviewScore: 4.5,
      },
    },
    {
      id: 2,
      name: "Restaurant B",
      cuisine: "Cuisine B",
      rating: 4.0,
      shortDescription: "Description B",
      details: {
        contactEmail: "test@restaurant.com",
        address: "Address B",
        openingHours: { weekday: "Weekday B", weekend: "Weekend B" },
        reviewScore: 4.0,
      },
    },
  ];

  beforeEach(() => {
    (useRestaurants as jest.Mock).mockReturnValue({
      restaurants: mockRestaurants,
      selectedRestaurant: null,
      setSelectedRestaurant: jest.fn(),
    });

    (useBookTable as jest.Mock).mockReturnValue({
      bookTable: mockBookTable,
    });
  });

  test("renders the restaurant list", () => {
    render(<Home />);

    expect(screen.getByText("Restaurant A")).toBeInTheDocument();
    expect(screen.getByText("Restaurant B")).toBeInTheDocument();
  });

  test("selects a restaurant and shows details and booking options", () => {
    const setSelectedRestaurantMock = jest.fn();

    (useRestaurants as jest.Mock).mockReturnValue({
      restaurants: mockRestaurants,
      selectedRestaurant: mockRestaurants[0],
      setSelectedRestaurant: setSelectedRestaurantMock,
    });

    render(<Home />);

    expect(screen.getByTestId("restaurant-name")).toHaveTextContent(
      "Restaurant A"
    );

    fireEvent.click(screen.getByText("Restaurant B"));

    expect(setSelectedRestaurantMock).toHaveBeenCalledWith(mockRestaurants[1]);
  });
});
