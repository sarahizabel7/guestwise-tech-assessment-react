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
import * as yup from "yup";
import { addHours, format, differenceInHours } from "date-fns";

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

  // TODO: schema can be in a separate file
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    date: yup.string().required(),
    time: yup
      .string()
      .required("Time is required")
      .test(
        "is-at-least-one-hour-ahead",
        "Please select a time that is at least 1 hour from now.",
        function (value) {
          const { date } = this.parent;
          if (!value || !date) return false;

          const selectedDateTime = new Date(`${date}T${value}`);
          const oneHourLaterFromNow = addHours(new Date(), 1);

          return differenceInHours(selectedDateTime, oneHourLaterFromNow) >= 0; // Validate if selected time is at least 1 hour ahead
        }
      ),
    guests: yup
      .number()
      .required()
      .positive()
      .integer()
      .max(
        12,
        `Maximum 12 guests allowed. For larger groups, contact the restaurant at ${restaurant?.details.contactEmail}.`
      )
      .min(1, "Please select at least 1 guest to proceed with your booking."),
  });

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

      <Form noValidate onSubmit={formik.handleSubmit}>
        <FormGroup className="mb-3">
          <FormLabel>Name</FormLabel>
          <FormControl
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
          <FormLabel>Email</FormLabel>
          <FormControl
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
          <FormLabel>Phone</FormLabel>
          <FormControl
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
          <FormLabel>Date</FormLabel>
          <FormControl
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
          <FormLabel>Time</FormLabel>
          <FormControl
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
          <FormLabel>Guests</FormLabel>
          <FormControl
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
