import * as yup from "yup";

export const flightSearchSchema = yup.object().shape({
  from: yup.string().required("Departure city is required"),
  to: yup.string().required("Destination city is required"),
  departureDate: yup.date().required("Departure date is required"),
  returnDate: yup.date().nullable().when("tripType", {
    is: "return",
    then: yup.date().required("Return date is required"),
  }),
  passengers: yup.number().min(1, "At least one passenger required").required(),
  class: yup.string().required("Class is required"),
  specialFare: yup.string().nullable(),
});
