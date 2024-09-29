import { fireEvent, render, screen } from "@testing-library/react";
import { RestaurantList } from "../RestaurantList";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const restaurantMock = {
  id: 1,
  name: "Test Restaurant",
  cuisine: "Test Cuisine",
  rating: 4.5,
  shortDescription: "A fine dining experience with a modern twist.",
  details: {
    contactEmail: "test@restaurant.com",
    address: "123 Main St",
    openingHours: {
      weekday: "12:00 PM - 10:00 PM",
      weekend: "11:00 AM - 11:00 PM",
    },
    reviewScore: 4.5,
  },
};

describe("RestaurantList Component", () => {
  const mockSelectRestaurant = jest.fn();

  const mockRestaurants = [
    { ...restaurantMock, id: 1, name: "Test Restaurant 1", rating: 4.8 },
    { ...restaurantMock, id: 2, name: "Test Restaurant 2", rating: 4.2 },
    { ...restaurantMock, id: 3, name: "Another Restaurant", rating: 3.9 },
  ];

  test("renders the RestaurantList component with restaurants", () => {
    render(
      <RestaurantList
        restaurants={mockRestaurants}
        onRestaurantSelect={mockSelectRestaurant}
      />
    );

    expect(screen.getByText("Restaurants")).toBeInTheDocument();
    expect(screen.getByText("Test Restaurant 1")).toBeInTheDocument();
    expect(screen.getByText("Test Restaurant 2")).toBeInTheDocument();
    expect(screen.getByText("Another Restaurant")).toBeInTheDocument();
  });

  test("filters restaurants based on search input", () => {
    render(
      <RestaurantList
        restaurants={mockRestaurants}
        onRestaurantSelect={mockSelectRestaurant}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search...");
    userEvent.type(searchInput, "Test Restaurant 1");

    expect(screen.getByText("Test Restaurant 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Restaurant 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Another Restaurant")).not.toBeInTheDocument();
  });

  test('shows "No restaurants found" when no match for search input', () => {
    render(
      <RestaurantList
        restaurants={mockRestaurants}
        onRestaurantSelect={mockSelectRestaurant}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search...");
    userEvent.type(searchInput, "Non-existing Restaurant");

    expect(screen.getByText("No restaurants found.")).toBeInTheDocument();
  });

  test("sorts restaurants by rating", () => {
    render(
      <RestaurantList
        restaurants={mockRestaurants}
        onRestaurantSelect={mockSelectRestaurant}
      />
    );

    const sortByRatingRadio = screen.getByTestId("rating-radio");
    fireEvent.click(sortByRatingRadio);

    const sortedRestaurants = screen.getAllByTestId("restaurant-list-item");
    expect(sortedRestaurants[0]).toHaveTextContent("Test Restaurant 1");
    expect(sortedRestaurants[2]).toHaveTextContent("Another Restaurant");
  });

  test("sorts restaurants by name", () => {
    render(
      <RestaurantList
        restaurants={mockRestaurants}
        onRestaurantSelect={mockSelectRestaurant}
      />
    );

    const sortByNameRadio = screen.getByTestId("name-radio");
    fireEvent.click(sortByNameRadio);

    const sortedRestaurants = screen.getAllByTestId("restaurant-list-item");
    expect(sortedRestaurants[0]).toHaveTextContent("Another Restaurant");
    expect(sortedRestaurants[2]).toHaveTextContent("Test Restaurant 2");
  });

  test("calls onRestaurantSelect when a restaurant is clicked", () => {
    render(
      <RestaurantList
        restaurants={mockRestaurants}
        onRestaurantSelect={mockSelectRestaurant}
      />
    );

    const restaurantItem = screen.getByText("Test Restaurant 1");
    fireEvent.click(restaurantItem);

    expect(mockSelectRestaurant).toHaveBeenCalledWith(mockRestaurants[0]);
  });
});
