import React, { useEffect } from "react";
import {
  Container,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import { useBookTable } from "../hooks/useBookTable";
import { Booking } from "../types";
import { useFormik, FormikHelpers } from "formik";

type BookTableProps = {
  restaurantId: number;
};

interface FormValues {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}

const BookTable: React.FC<BookTableProps> = ({ restaurantId }) => {
  const { bookTable, hasError, loading } = useBookTable();

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    console.log("values", values);

    const booking: Booking = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      date: values.date,
      time: values.time,
      numberOfguests: values.guests,
      restaurantId,
    };

    await bookTable(booking);

    if (!hasError) {
      resetForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: 0,
    },
    onSubmit: handleSubmit,
  });

  // TODO: Add an alert if booking fails
  useEffect(() => {
    if (hasError) {
      alert("Booking failed");
    }
  }, [hasError]);

  return (
    <Container>
      <h2>Book a Table</h2>

      <Form onSubmit={formik.handleSubmit}>
        <FormGroup className="mb-3">
          <FormLabel>Name</FormLabel>
          <FormControl
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            required
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            required
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel>Phone</FormLabel>
          <FormControl
            type="tel"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            required
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel>Date</FormLabel>
          <FormControl
            type="date"
            id="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            required
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel>Time</FormLabel>
          <FormControl
            type="time"
            id="time"
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            required
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel>Guests</FormLabel>
          <FormControl
            type="number"
            id="guests"
            name="guests"
            value={formik.values.guests}
            onChange={formik.handleChange}
            required
          />
        </FormGroup>

        <Button type="submit" disabled={loading}>
          Book
        </Button>
      </Form>
    </Container>
  );
};

export default BookTable;
