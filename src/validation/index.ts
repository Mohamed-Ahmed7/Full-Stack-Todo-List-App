import * as yup from "yup";

export const registerSchema = yup
  .object({
    username: yup
      .string()
      .min(5, "Username should be at-least 5 characters.")
      .required("Username is required."),
    email: yup
      .string()
      .required("Email is required.")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Email address is not valid."),
    password: yup
      .string()
      .min(6, "Password should be at-least 6 characters.")
      .required("Password is required."),
  })
  .required();
