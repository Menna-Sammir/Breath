import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useAccount } from "./useAccounts";

export const useActivities = (id?: string) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAccount();

  const location = useLocation();

  const { data: activities, isLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await agent.get<Activity[]>("/activities");
      return response.data;
    },
    enabled: !id && location.pathname === "/activities" && !!currentUser,
    select: (data) => {
      return data.map((activity) => ({
        ...activity,
        isHost: activity.hostId === currentUser?.id,
        isGoing: activity.attendees.some((att) => att.id === currentUser?.id),
      }));
    },
  });

  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ["activity", id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`);
      return response.data;
    },
    enabled: !!id && !!currentUser,
    select: (activity) => ({
      ...activity,
      isHost: activity.hostId === currentUser?.id,
      isGoing: activity.attendees.some((att) => att.id === currentUser?.id),
    }),
  });

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      // await agent.put<Activity>("/activities", activity);
      await agent.put<Activity>(`/activities/${activity.id}`, activity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const createdActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      const response = await agent.post<Activity>("/activities", activity);
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
    activities,
    isLoading,
    updateActivity,
    createdActivity,
    deleteActivity,
    activity,
    isLoadingActivity,
    updateAttendance,
  };
};
