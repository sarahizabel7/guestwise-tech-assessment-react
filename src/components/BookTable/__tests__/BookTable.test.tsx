/* eslint-disable testing-library/no-unnecessary-act */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { BookTable } from "../BookTable";
import { useBookTable } from "../../../hooks";
import { Restaurant } from "../../../types";
import { act } from "react";

jest.mock("../../../hooks");

const mockBookTable = jest.fn();

const restaurantMock: Restaurant = {
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

describe("BookTable Component", () => {
  beforeEach(() => {
    (useBookTable as jest.Mock).mockReturnValue({
      bookTable: mockBookTable,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form correctly", () => {
    render(<BookTable restaurant={restaurantMock} />);

    expect(screen.getByTestId("book-table-form")).toBeInTheDocument();
    expect(screen.getByTestId("book-name-label")).toBeInTheDocument();
    expect(screen.getByTestId("book-name-input")).toBeInTheDocument();

    expect(screen.getByTestId("book-email-label")).toBeInTheDocument();
    expect(screen.getByTestId("book-email-input")).toBeInTheDocument();

    expect(screen.getByTestId("book-phone-label")).toBeInTheDocument();
    expect(screen.getByTestId("book-phone-input")).toBeInTheDocument();

    expect(screen.getByTestId("book-date-label")).toBeInTheDocument();
    expect(screen.getByTestId("book-date-input")).toBeInTheDocument();

    expect(screen.getByTestId("book-time-label")).toBeInTheDocument();
    expect(screen.getByTestId("book-time-input")).toBeInTheDocument();

    expect(screen.getByTestId("book-guests-label")).toBeInTheDocument();
    expect(screen.getByTestId("book-guests-input")).toBeInTheDocument();

    const submitButton = screen.getByTestId("book-button");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test("shows validation errors when form inputs are touched but with empty fields", async () => {
    render(<BookTable restaurant={restaurantMock} />);
    const fields = [
      { testId: "book-name-input", label: "name" },
      { testId: "book-email-input", label: "email" },
      { testId: "book-phone-input", label: "phone" },
      { testId: "book-date-input", label: "date" },
      { testId: "book-time-input", label: "time" },
      { testId: "book-guests-input", label: "guests" },
    ];

    for (const field of fields) {
      await act(async () => {
        userEvent.click(screen.getByTestId(field.testId));
        userEvent.tab();
      });

      await waitFor(() => {
        expect(screen.getByTestId(field.testId)).toHaveClass(
          "form-control is-invalid"
        );
      });
    }
  });

  test("shows validation error when selecting more than 12 guests", async () => {
    render(<BookTable restaurant={restaurantMock} />);

    await act(async () => {
      const guestsInput = screen.getByTestId("book-guests-input");
      userEvent.clear(guestsInput);
      userEvent.type(guestsInput, " 13");
      userEvent.tab();
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          "Maximum 12 guests allowed. For larger groups, contact the restaurant at test@restaurant.com."
        )
      ).toBeInTheDocument();
    });
  });

  test("submits the form with valid data", async () => {
    render(<BookTable restaurant={restaurantMock} />);

    userEvent.type(screen.getByTestId("book-name-input"), "John Doe");
    userEvent.type(screen.getByTestId("book-email-input"), "john@example.com");
    userEvent.type(screen.getByTestId("book-phone-input"), "123456789");
    userEvent.type(screen.getByTestId("book-date-input"), "2025-10-01");
    userEvent.type(screen.getByTestId("book-time-input"), "19:00");
    userEvent.type(screen.getByTestId("book-guests-input"), "2");

    await act(async () => {
      fireEvent.submit(screen.getByTestId("book-button"));
    });

    await waitFor(() => {
      expect(mockBookTable).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        phone: "123456789",
        date: "2025-10-01",
        time: "19:00",
        numberOfguests: 2,
        restaurantId: 1,
      });
    });

    expect(
      screen.getByText(/your table has been successfully booked/i)
    ).toBeInTheDocument();
  });

  test("displays an error alert if booking fails", async () => {
    mockBookTable.mockRejectedValueOnce(new Error("Booking failed"));

    render(<BookTable restaurant={restaurantMock} />);

    userEvent.type(screen.getByTestId("book-name-input"), "John Doe");
    userEvent.type(screen.getByTestId("book-email-input"), "john@example.com");
    userEvent.type(screen.getByTestId("book-phone-input"), "123456789");
    userEvent.type(screen.getByTestId("book-date-input"), "2025-10-01");
    userEvent.type(screen.getByTestId("book-time-input"), "19:00");
    userEvent.type(screen.getByTestId("book-guests-input"), "2");

    await act(async () => {
      fireEvent.submit(screen.getByTestId("book-button"));
    });

    await waitFor(() => {
      expect(mockBookTable).toHaveBeenCalled();
    });

    expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
  });
});
