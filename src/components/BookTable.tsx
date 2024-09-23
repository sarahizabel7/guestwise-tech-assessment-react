import React from "react";
import { Container } from "react-bootstrap";

const BookTable: React.FC = ({}) => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) throw new Error("Booking failed");

      console.log("Booking successful");
    } catch (err) {
      console.log(err);
    } finally {
      console.log("Completed request");
    }
  };

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
        <button type="submit">Book</button>
      </form>
    </Container>
  );
};

export default BookTable;
