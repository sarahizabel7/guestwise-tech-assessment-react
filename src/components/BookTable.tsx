import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useBookTable } from "../hooks/useBookTable";
import { Booking } from "../types";

type BookTableProps = {
  restaurantId: number;
};

const BookTable: React.FC<BookTableProps> = ({ restaurantId }) => {
  const { bookTable, hasError, loading } = useBookTable();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // TODO: Get data from form
    const booking: Booking = {
      name: "John Doe",
      email: "john@gmail.com",
      phone: "+3457234654",
      date: "2021-10-10",
      time: "12:00",
      numberOfguests: 2,
      restaurantId,
    };

    bookTable(booking);
  };

  // TODO: Add an alert if booking fails
  useEffect(() => {
    if (hasError) {
      alert("Booking failed");
    }
  }, [hasError]);

  return (
    <Container>
      <h2>Book a Table</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <br />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <br />
        <label htmlFor="phone">Phone</label>
        <input type="tel" id="phone" name="phone" />
        <br />
        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" />
        <br />
        <label htmlFor="time">Time</label>
        <input type="time" id="time" name="time" />
        <br />
        <label htmlFor="guests">Guests</label>
        <input type="number" id="guests" name="guests" />
        <br />
        <button type="submit" disabled={loading}>
          Book
        </button>
      </form>
    </Container>
  );
};

export default BookTable;
