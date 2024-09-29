import * as yup from "yup";
import { addHours, differenceInHours } from "date-fns";
import { RestaurantDetailsData } from "../../types";

const getFormSchema = (restaurantDetails: RestaurantDetailsData) => {
  return yup.object().shape({
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

          return differenceInHours(selectedDateTime, oneHourLaterFromNow) >= 0;
        }
      ),
    guests: yup
      .number()
      .required()
      .positive()
      .integer()
      .max(
        12,
        `Maximum 12 guests allowed. For larger groups, contact the restaurant at ${restaurantDetails.contactEmail}.`
      )
      .min(1, "Please select at least 1 guest to proceed with your booking."),
  });
};

export { getFormSchema };
