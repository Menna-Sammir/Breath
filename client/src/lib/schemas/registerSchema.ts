import { z } from "zod";
import { requiredString } from "../utils/utils";

export const registerSchema = z.object({
  email: z.string("email is required").email("Invalid email address"),
  displayName: requiredString("displayName is required"),
  password: requiredString("password is required").min(
    6,
    "Password must be at least 6 characters"
  ),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
