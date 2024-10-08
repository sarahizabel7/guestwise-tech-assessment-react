import { sortRestaurants, filterRestaurants } from "../filterRestaurants";
import { Restaurant } from "../../types";

const mockDetails = {
  contactEmail: "test@restaurant.com",
  address: "Address",
  openingHours: {
    weekday: "12:00 PM - 10:00 PM",
    weekend: "11:00 AM - 11:00 PM",
  },
  reviewScore: 4.5,
};

const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Pizza Place 1",
    shortDescription: "",
    cuisine: "",
    rating: 4.5,
    details: mockDetails,
  },
  {
    id: 2,
    name: "Burger Joint 2",
    shortDescription: "",
    cuisine: "",
    rating: 4.2,
    details: mockDetails,
  },
  {
    id: 3,
    name: "Pizza Place 2",
    shortDescription: "",
    cuisine: "",
    rating: 4.8,
    details: mockDetails,
  },
  {
    id: 4,
    name: "Sushi Spot 1",
    shortDescription: "",
    cuisine: "",
    rating: 4.6,
    details: mockDetails,
  },
];

describe("filterRestaurants", () => {
  it("should filter restaurants by name", () => {
    const filteredRestaurants = mockRestaurants.filter(
      filterRestaurants("Pizza")
    );
    expect(filteredRestaurants).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Pizza Place 1" }),
        expect.objectContaining({ name: "Pizza Place 2" }),
      ])
    );
  });

  it("should return an empty array if no restaurants match the filter", () => {
    const filteredRestaurants = mockRestaurants.filter(
      filterRestaurants("Taco")
    );
    expect(filteredRestaurants).toEqual([]);
  });

  it("should be case insensitive", () => {
    const filteredRestaurants = mockRestaurants.filter(
      filterRestaurants("pIzZa")
    );
    expect(filteredRestaurants).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Pizza Place 1" }),
        expect.objectContaining({ name: "Pizza Place 2" }),
      ])
    );
  });
});

describe("sortRestaurants", () => {
  it("should sort restaurants by rating in descending order", () => {
    const sortedByRating = [...mockRestaurants].sort(sortRestaurants("rating"));
    expect(sortedByRating).toEqual([
      {
        id: 3,
        name: "Pizza Place 2",
        shortDescription: "",
        cuisine: "",
        rating: 4.8,
        details: mockDetails,
      },
      {
        id: 4,
        name: "Sushi Spot 1",
        shortDescription: "",
        cuisine: "",
        rating: 4.6,
        details: mockDetails,
      },
      {
        id: 1,
        name: "Pizza Place 1",
        shortDescription: "",
        cuisine: "",
        rating: 4.5,
        details: mockDetails,
      },
      {
        id: 2,
        name: "Burger Joint 2",
        shortDescription: "",
        cuisine: "",
        rating: 4.2,
        details: mockDetails,
      },
    ]);
  });

  it("should sort restaurants by name in ascending order", () => {
    const sortedByName = [...mockRestaurants].sort(sortRestaurants("name"));
    expect(sortedByName).toEqual([
      {
        id: 2,
        name: "Burger Joint 2",
        shortDescription: "",
        cuisine: "",
        rating: 4.2,
        details: mockDetails,
      },
      {
        id: 1,
        name: "Pizza Place 1",
        shortDescription: "",
        cuisine: "",
        rating: 4.5,
        details: mockDetails,
      },
      {
        id: 3,
        name: "Pizza Place 2",
        shortDescription: "",
        cuisine: "",
        rating: 4.8,
        details: mockDetails,
      },
      {
        id: 4,
        name: "Sushi Spot 1",
        shortDescription: "",
        cuisine: "",
        rating: 4.6,
        details: mockDetails,
      },
    ]);
  });
});
