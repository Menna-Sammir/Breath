import { useState } from "react";
import StyledButton from "../../../app/shared/components/StyledButton";
import { Star } from "lucide-react";
import TextInput from "../../../app/shared/components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import {
  reviewSchema,
  type ReviewSchema,
} from "../../../lib/schemas/reviewSchema";
import { useParams } from "react-router";
import { useReviews } from "../../../lib/hooks/useReviews";
import { Bounce, toast } from "react-toastify";

export function AddReviewForm() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const { id } = useParams();

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReviewSchema>({
    mode: "onTouched",
    resolver: zodResolver(reviewSchema) as unknown as Resolver<ReviewSchema>,
    defaultValues: {
      body: "",
      rating: 0,
    },
  });

  const { createdReview, isLoading } = useReviews(id);

  const onSubmit: SubmitHandler<ReviewSchema> = async (data) => {
    const { rating, ...rest } = data;
    const flattenedData = {
      rating: rating,
      activityId: id!,
      ...rest,
    };

    try {
      createdReview.mutate(flattenedData, {
        onSuccess: () => {
          reset();
          toast.success("Review created successfully!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <p>Loading review...</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-card rounded-lg p-6 border"
    >
      <div>
        <label className="block text-sm font-medium mb-3">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => {
                setRating(star);
                setValue("rating", star, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={32}
                className={
                  star <= (hoverRating || rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300"
                }
              />
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="mt-2 text-sm text-red-600">{errors.rating.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">Your Review</label>
        <TextInput
          name="body"
          placeholder="Share your experience with us..."
          control={control}
          multiline
          rows={4}
        />
      </div>

      <StyledButton
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary-dark text-white"
      >
        {isLoading ? "Submitting..." : "Submit Review"}
      </StyledButton>
    </form>
  );
}
