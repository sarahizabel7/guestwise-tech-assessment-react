import { render, screen } from "@testing-library/react";
import { RestaurantDetails } from "../RestaurantDetails";

describe("RestaurantDetails", () => {
  const restaurant = {
    id: 22,
    name: "Restaurant 22",
    shortDescription: "Famous for its twist on the classic Negroni.",
    cuisine: "Cuisine Type",
    rating: 4.9,
    details: {
      address: "22 Address St, City",
      openingHours: {
        weekday: "12:00 PM - 10:00 PM",
        weekend: "11:00 AM - 11:00 PM",
      },
      reviewScore: 4.9,
      contactEmail: "contact@restaurant22.com",
    },
  };

  test("renders restaurant details correctly", () => {
    render(<RestaurantDetails restaurant={restaurant} />);

    expect(screen.getByTestId("restaurant-name")).toHaveTextContent(
      restaurant.name
    );

    expect(screen.getByTestId("restaurant-address")).toHaveTextContent(
      restaurant.details.address
    );

    expect(screen.getByTestId("restaurant-review")).toHaveTextContent(
      `Review Score: ${restaurant.details.reviewScore}`
    );

    expect(screen.getByTestId("restaurant-email")).toHaveTextContent(
      `Contact: ${restaurant.details.contactEmail}`
    );

    expect(screen.getByTestId("restaurant-weekday-hours")).toHaveTextContent(
      `Weekday: ${restaurant.details.openingHours.weekday}`
    );

    expect(screen.getByTestId("restaurant-weekend-hours")).toHaveTextContent(
      `Weekend: ${restaurant.details.openingHours.weekend}`
    );
  });
});
