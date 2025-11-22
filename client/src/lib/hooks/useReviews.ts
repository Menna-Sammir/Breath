import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import agent from "../api/agent";
import { useAccount } from "./useAccounts";
import type { FieldValues } from "react-hook-form";

export const useReviews = (id?: string) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAccount();

  const {
    data: reviewsGroup,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<PagedList<Review, string>>({
    queryKey: ["reviews", id],
    queryFn: async ({ pageParam = null }) => {
      const response = await agent.get<PagedList<Review, string>>(
        `/reviews/${id}/reviews`,
        {
          params: {
            cursor: pageParam,
            pageSize: 3,
          },
        }
      );
      return response.data;

    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !!id,
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
      })),
    }),
  });

  const updateReview = useMutation({
    mutationFn: async (review: Review) => {
      await agent.put<Review>(`/reviews/${review.id}`, review);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  const createdReview = useMutation({
    mutationFn: async (review: FieldValues) => {
      const response = await agent.post<Review>("/reviews", review);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  const deleteReview = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/reviews/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  const {
    data: getReviewSummery,
    isLoading: isLoadingReviewSummary,
  } = useQuery({
    queryKey: ["reviews-summary", id],
    queryFn: async () => {
      const response = await agent.get<ReviewsSummary>(
        `/reviews/${id}/summary`
      );
      return response.data;
    },
    enabled: !!id && !!currentUser,
    select: (data) => data,
  });

  return {
    reviewsGroup,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    updateReview,
    createdReview,
    deleteReview,
    getReviewSummery,
    isLoadingReviewSummary,
  };
};
