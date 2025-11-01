import { object, string } from "yup";

export const userFormSchema = object({
  name: string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),

  email: string()
    .required("Email is required")
    .email("Invalid email format")
    .max(100, "Email must not exceed 100 characters"),
});
