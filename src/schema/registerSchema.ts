import * as zod from "zod";

export const Schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name min should contain 3 char")
      .max(10, "Name max should contain 10 char"),

    email: zod
      .string()
      .nonempty("Email rs required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "invalid email",
      ),
    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "password requires a minimum of 8 characters and at least one of each: uppercase letter, lowercase letter, digit, and special character",
      ),
    phone: zod
      .string()
      .nonempty("phone is required")
      .regex(/^01[0125][0-9]{8}$/, "Invalid Phone"),

    rePassword: zod.string().nonempty("repassword is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "invalid repassword",
  });
