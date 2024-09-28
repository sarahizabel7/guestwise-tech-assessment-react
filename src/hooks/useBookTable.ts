import { createBooking } from "../services/api";
import { Booking } from "../types";

const useBookTable = () => {
  const bookTable = async (booking: Booking) => {
    const response = await createBooking(booking);

    if (!response.ok) throw new Error("Booking failed");
  };

  return { bookTable };
};

export { useBookTable };
