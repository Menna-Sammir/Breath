import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useMemo, useState } from "react";
import type { EditProfileSchema } from "../schemas/editProfileSchema";

export const useProfile = (id?: string) => {
  const QueryClient = useQueryClient();
  const [filter, setFilter] = useState<string | null>(null);

  const { data: profile, isLoading: loadingProfile } = useQuery<Profile>({
    queryKey: ["profile", id],
    queryFn: async () => {
      const response = await agent.get<Profile>(`/profiles/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const { data: photos, isLoading: loadingPhotos } = useQuery<Photo[]>({
    queryKey: ["photos", id],
    queryFn: async () => {
      const response = await agent.get<Photo[]>(`/profiles/${id}/photos`);
      return response.data;
    },
    enabled: !!id,
  });

  const uploadPhoto = useMutation({
    mutationFn: async (file: Blob) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await agent.post<Photo>(
        `/profiles/${id}/add-photo`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data;
    },
    onSuccess: async (photo: Photo) => {
      await QueryClient.invalidateQueries({ queryKey: ["photos", id] });

      QueryClient.setQueryData<User>(["user"], (data: User | undefined) => {
        if (data) {
          return { ...data, imageUrl: data.imageUrl ?? photo.url };
        }
        return data;
      });

      QueryClient.setQueryData<Profile>(
        ["profile", id],
        (data: Profile | undefined) => {
          if (data) {
            return { ...data, imageUrl: data.imageUrl ?? photo.url };
          }
          return data;
        }
      );
    },
  });

  const setMainPhoto = useMutation({
    mutationFn: async (photo: Photo) => {
      await agent.put(`/profiles/${photo.id}/setMain`);
    },
    onSuccess: async (_, photo) => {
      QueryClient.setQueryData<User>(["user"], (data: User | undefined) => {
        if (data) {
          return { ...data, imageUrl: photo.url };
        }
        return data;
      });
      QueryClient.setQueryData<Profile>(
        ["profile", id],
        (data: Profile | undefined) => {
          if (data) {
            return { ...data, imageUrl: photo.url };
          }
          return data;
        }
      );
    },
  });

  const deletePhoto = useMutation({
    mutationFn: async (photoId: string) => {
      await agent.delete(`/profiles/${photoId}/photos`);
    },
    onSuccess: async (_, photoId) => {
      await QueryClient.setQueryData<Photo[]>(["photos", id], (photos) => {
        if (photos) {
          return photos.filter((photo) => photo.id !== photoId);
        }
        return photos;
      });
    },
  });

  const { data: userActivities, isLoading: loadingUserActivities } = useQuery({
    queryKey: ["user-activities", filter],
    queryFn: async () => {
      const response = await agent.get<Activity[]>(
        `/profiles/${id}/activities`,
        {
          params: {
            filter,
          },
        }
      );
      return response.data;
    },
    enabled: !!id && !!filter,
  });

  const updateProfile = useMutation({
    mutationFn: async (profile: EditProfileSchema) => {
      await agent.put(`/profiles`, profile);
    },
    onSuccess: (_, profile) => {
      QueryClient.setQueryData(["profile", id], (data: Profile) => {
        if (!data) return data;
        return {
          ...data,
          displayName: profile.displayName,
          bio: profile.bio,
        };
      });
      QueryClient.setQueryData(["user"], (userData: User) => {
        if (!userData) return userData;
        return {
          ...userData,
          displayName: profile.displayName,
        };
      });
    },
  });

  const isCurrentUser = useMemo(() => {
    return id === QueryClient.getQueryData<User>(["user"])?.id;
  }, [id, QueryClient]);

  return {
    profile,
    loadingProfile,
    photos,
    loadingPhotos,
    uploadPhoto,
    deletePhoto,
    setMainPhoto,
    userActivities,
    loadingUserActivities,
    updateProfile,
    setFilter,
    isCurrentUser,
  };
};
