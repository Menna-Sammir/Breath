import z from "zod";

export const reviewSchema = z.object({
  body: z
    .string()
    .min(10, { message: "Comment must be at least 10 characters" }),
  rating: z
    .number()
    .min(1)
    .max(5, { message: "Rating must be between 1 and 5" }),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;
