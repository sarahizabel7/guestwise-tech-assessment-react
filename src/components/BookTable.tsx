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
import { useBookTable } from "../hooks/useBookTable";
import { Booking } from "../types";
import { useFormik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useRestaurantDetails } from "../hooks";
import { format, addHours } from "date-fns";

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
  const { bookTable } = useBookTable();
  const { restaurantDetails } = useRestaurantDetails(restaurantId);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    date: yup.string().required(),
    time: yup.string().required(),
    guests: yup
      .number()
      .required()
      .positive()
      .integer()
      .max(
        12,
        `Maximum 12 guests allowed. For larger groups, contact the restaurant at ${restaurantDetails?.contactEmail}`
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
        restaurantId,
      };

      await bookTable(booking);

      setShowSuccess(true);
      resetForm();
    } catch (error) {
      console.error(error);
      setShowError(true);
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
            isInvalid={!!formik.errors.name}
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
            isInvalid={!!formik.errors.email}
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
            isInvalid={!!formik.errors.phone}
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
            isInvalid={!!formik.errors.date}
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
            min={format(addHours(new Date(), 1), "HH:mm")}
            value={formik.values.time}
            onChange={formik.handleChange}
            isValid={formik.touched.time && !formik.errors.time}
            isInvalid={!!formik.errors.time}
            onBlur={formik.handleBlur}
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
            isValid={formik.touched.guests && !formik.errors.guests}
            isInvalid={!!formik.errors.guests}
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

      {showError && (
        <Alert variant="danger" dismissible onClose={() => setShowError(false)}>
          {`An error occurred while trying to book your table. Please try again or contact the restaurant at ${restaurantDetails?.contactEmail}.`}
        </Alert>
      )}

      {showSuccess && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setShowSuccess(false)}
        >
          Your table has been successfully booked!
        </Alert>
      )}
    </Stack>
  );
};

export default BookTable;
