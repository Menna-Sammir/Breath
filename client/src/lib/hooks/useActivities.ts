import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useAccount } from "./useAccounts";
import { useStore } from "./useStore";
import type { FieldValues } from "react-hook-form";

export const useActivities = (id?: string) => {
  const {
    activityStore: { filter, startDate, city, minPrice, maxPrice },
  } = useStore();

  const queryClient = useQueryClient();
  const { currentUser } = useAccount();

  const {
    data: activitiesGroup,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<PagedList<Activity, string>>({
    queryKey: ["activities", filter, startDate, city, minPrice, maxPrice],
    queryFn: async ({ pageParam = null }) => {
      const response = await agent.get<PagedList<Activity, string>>(
        "/activities",
        {
          params: {
            cursor: pageParam,
            pageSize: 3,
            filter,
            city,
            minPrice,
            maxPrice,
            startDate,
          },
        }
      );
      return response.data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !id && !!currentUser,
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        items: page.items.map((activity) => {
          const host = activity.attendees.find((x) => x.id === activity.hostId);
          return {
            ...activity,
            isHost: currentUser?.id === activity.hostId,
            isGoing: activity.attendees.some((x) => x.id === currentUser?.id),
            hostImageUrl: host?.imageUrl,
          };
        }),
      })),
    }),
  });

  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ["activity", id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`);
      return response.data;
    },
    enabled: !!id && !!currentUser,

    select: (activity) => {
      const host = activity.attendees.find((att) => att.id === activity.hostId);
      return {
        ...activity,
        isHost: activity.hostId === currentUser?.id,
        isGoing: activity.attendees.some((att) => att.id === currentUser?.id),
        hostImageUrl: host?.imageUrl,
      };
    },
  });

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await agent.put<Activity>(`/activities/${activity.id}`, activity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const createdActivity = useMutation({
    mutationFn: async (activity: FieldValues) => {
      console.log("activity", activity);
      const response = await agent.post<Activity>("/activities", activity);
      console.log("response", response.data);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activities/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const updateAttendance = useMutation({
    mutationFn: async (id: string) => {
      await agent.post(`/activities/${id}/attend`);
    },
    onMutate: async (activityId: string) => {
      if (activityId) {
        await queryClient.cancelQueries({
          queryKey: ["activity", activityId],
        });
        const prevActivity = queryClient.getQueryData<Activity>([
          "activity",
          activityId,
        ]);

        queryClient.setQueryData<Activity>(
          ["activity", activityId],
          (oldActivity) => {
            if (!oldActivity || !currentUser) return oldActivity;

            const isAttending = oldActivity.attendees.some(
              (a) => a.id === currentUser.id
            );
            const isHost = oldActivity.hostId === currentUser.id;

            return {
              ...oldActivity,
              isCancelled: isHost
                ? !oldActivity.isCancelled
                : oldActivity.isCancelled,
              attendees: isAttending
                ? isHost
                  ? oldActivity.attendees
                  : oldActivity.attendees.filter((x) => x.id !== currentUser.id)
                : [
                    ...oldActivity.attendees,
                    {
                      id: currentUser.id,
                      displayName: currentUser.displayName,
                      imageUrl: currentUser.imageUrl,
                    },
                  ],
            };
          }
        );

        return { prevActivity };
      }
    },
    onError: (_error, _activityId, context) => {
      if (context?.prevActivity) {
        queryClient.setQueryData<Activity>(
          ["activities", _activityId],
          context.prevActivity
        );
      }
    },
  });

  return {
    activitiesGroup,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    updateActivity,
    createdActivity,
    deleteActivity,
    activity,
    isLoadingActivity,
    updateAttendance,
  };
};
