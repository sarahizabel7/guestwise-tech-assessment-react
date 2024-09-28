import { useState } from "react";
import { createBooking } from "../services/api";
import { Booking } from "../types";

const useBookTable = () => {
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const bookTable = async (booking: Booking) => {
    try {
      setLoading(true);
      const response = await createBooking(booking);

      if (!response.ok) throw new Error("Booking failed");

      console.log("Booking successful");
      setHasError(false);
    } catch (error) {
      console.error(error);
      setHasError(true);
    } finally {
      console.log("Completed request");
      setLoading(false);
    }
  };

  return { bookTable, hasError, loading };
};

export { useBookTable };
