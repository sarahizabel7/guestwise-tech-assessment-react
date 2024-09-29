import { useBookTable } from "../useBookTable";
import { createBooking } from "../../services/api";
import { Booking } from "../../types";
import { renderHook } from "@testing-library/react";
import { act } from "react";

jest.mock("../../services/api");

describe("useBookTable", () => {
  test("should book a table successfully", async () => {
    (createBooking as jest.Mock).mockResolvedValueOnce({ ok: true });

    const { result } = renderHook(() => useBookTable());
    const booking: Booking = {
      restaurantId: 1,
      date: "2024-09-29",
      time: "19:00",
      numberOfguests: 2,
      name: "John Doe",
      phone: "1234567890",
      email: "john@test.com",
    };

    await act(async () => {
      await result.current.bookTable(booking);
    });

    expect(createBooking).toHaveBeenCalledWith(booking);
  });

  test("should throw an error when booking fails", async () => {
    (createBooking as jest.Mock).mockResolvedValueOnce({ ok: false });

    const { result } = renderHook(() => useBookTable());
    const booking: Booking = {
      restaurantId: 1,
      date: "2024-09-29",
      time: "19:00",
      numberOfguests: 2,
      name: "John Doe",
      phone: "1234567890",
      email: "john@test.com",
    };

    await act(async () => {
      await expect(result.current.bookTable(booking)).rejects.toThrow(
        "Booking failed"
      );
    });

    expect(createBooking).toHaveBeenCalledWith(booking);
  });
});
