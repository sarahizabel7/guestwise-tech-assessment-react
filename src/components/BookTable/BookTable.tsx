import React, { useState } from "react";
import {
  Stack,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import { useBookTable } from "../../hooks";
import { Booking, Restaurant } from "../../types";
import { useFormik, FormikHelpers } from "formik";
import { format } from "date-fns";
import { getFormSchema } from "./formSchema";

type BookTableProps = {
  restaurant: Restaurant;
};

interface FormValues {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}

type AlertMessage = {
  variant: "success" | "danger";
  show: boolean;
  content: string;
};

const BookTable: React.FC<BookTableProps> = ({ restaurant }) => {
  const { bookTable } = useBookTable();

  const successAlertMessage: AlertMessage = {
    variant: "success",
    show: false,
    content: "Your table has been successfully booked!",
  };

  const errorAlertMessage: AlertMessage = {
    variant: "danger",
    show: false,
    content: `An error occurred while trying to book your table. Please try again or contact the restaurant at ${restaurant?.details.contactEmail}.`,
  };

  const [alertMessage, setAlertMessage] =
    useState<AlertMessage>(successAlertMessage);

  const schema = getFormSchema(restaurant.details);

  const initialValues: FormValues = {
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 0,
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm, setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const booking: Booking = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        date: values.date,
        time: values.time,
        numberOfguests: values.guests,
        restaurantId: restaurant.id,
      };

      await bookTable(booking);

      setAlertMessage({ ...successAlertMessage, show: true });
      resetForm();
    } catch (error) {
      console.error(error);
      setAlertMessage({ ...errorAlertMessage, show: true });
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    validationSchema: schema,
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <Stack gap={2}>
      <h2>Book a Table</h2>

      <Form
        noValidate
        onSubmit={formik.handleSubmit}
        data-testid="book-table-form"
      >
        <FormGroup className="mb-3">
          <FormLabel data-testid="book-name-label">Name</FormLabel>
          <FormControl
            data-testid="book-name-input"
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            isValid={formik.touched.name && !formik.errors.name}
            isInvalid={!!formik.errors.name && formik.touched.name}
            onBlur={formik.handleBlur}
            required
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel data-testid="book-email-label">Email</FormLabel>
          <FormControl
            data-testid="book-email-input"
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            isValid={formik.touched.email && !formik.errors.email}
            isInvalid={!!formik.errors.email && formik.touched.email}
            onBlur={formik.handleBlur}
            required
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel data-testid="book-phone-label">Phone</FormLabel>
          <FormControl
            data-testid="book-phone-input"
            type="tel"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            isValid={formik.touched.phone && !formik.errors.phone}
            isInvalid={!!formik.errors.phone && formik.touched.phone}
            onBlur={formik.handleBlur}
            required
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel data-testid="book-date-label">Date</FormLabel>
          <FormControl
            data-testid="book-date-input"
            type="date"
            id="date"
            name="date"
            min={format(new Date(), "yyyy-MM-dd")}
            value={formik.values.date}
            onChange={formik.handleChange}
            isValid={formik.touched.date && !formik.errors.date}
            isInvalid={!!formik.errors.date && formik.touched.date}
            onBlur={formik.handleBlur}
            required
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel data-testid="book-time-label">Time</FormLabel>
          <FormControl
            data-testid="book-time-input"
            type="time"
            id="time"
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            isValid={formik.touched.time && !formik.errors.time}
            isInvalid={!!formik.errors.time && formik.touched.time}
            onBlur={formik.handleBlur}
            required
          />
          <FormControl.Feedback type="invalid">
            {formik.errors.time}
          </FormControl.Feedback>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel data-testid="book-guests-label">Guests</FormLabel>
          <FormControl
            data-testid="book-guests-input"
            type="number"
            id="guests"
            name="guests"
            value={formik.values.guests}
            onChange={formik.handleChange}
            isValid={formik.touched.guests && !formik.errors.guests}
            isInvalid={!!formik.errors.guests && formik.touched.guests}
            onBlur={formik.handleBlur}
            required
          />
          <FormControl.Feedback type="invalid">
            {formik.errors.guests}
          </FormControl.Feedback>
        </FormGroup>

        <Button
          data-testid="book-button"
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
        >
          Book
        </Button>
      </Form>

      {alertMessage.show && (
        <Alert
          variant={alertMessage.variant}
          dismissible
          onClose={() => setAlertMessage({ ...alertMessage, show: false })}
        >
          {alertMessage.content}
        </Alert>
      )}
    </Stack>
  );
};

export { BookTable };
