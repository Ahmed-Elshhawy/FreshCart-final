import * as zod from "zod";

export const loginSchema = zod.object({
  email: zod
    .string()
    .nonempty("Email rs required")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "invalid email"),
  password: zod
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "password requires a minimum of 8 characters and at least one of each: uppercase letter, lowercase letter, digit, and special character",
    ),
});
