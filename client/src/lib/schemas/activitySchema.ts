import { z } from "zod";
import { requiredString } from "../utils/utils";

export const activitySchema = z.object({
  title: requiredString("Title"),
  description: requiredString("Description"),
  duration: requiredString("Duration"),
  price: z.coerce.number().min(0, { message: "Price must be at least 0" }),
  category: requiredString("Category"),
  date: z.coerce.date().refine((val) => !!val, {
    message: "Date is required",
  }),
  location: z.object({
    venue: requiredString("Venue"),
    city: z.string().optional(),
    country: z.string().optional(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),

  }),
  departurePlace: z.object({
    city: z.string().optional(),
    venue: z.string().optional(),
  }),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
