import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetIdentity } from "ra-core";
import { messaging } from "../firebase.config"; // Assuming firebase config is in this path
import { onMessage } from "firebase/messaging";

interface Notification {
  id: number;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

const fetchNotifications = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/api/v1/cms/notifications`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useNotifications = () => {
  const { data: user } = useGetIdentity();
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    enabled: !!user,
    refetchInterval: 60000, // Refetch every 1 minute
  });

  useEffect(() => {
    if (!messaging) return;

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Received foreground message:", payload);
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    });

    return () => unsubscribe();
  }, [queryClient]);

  const markAsReadMutation = useMutation({
    mutationFn: (id: number) =>
      fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/cms/notifications/${id}/read`,
        {
          method: "PATCH",
          credentials: "include",
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () =>
      fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/cms/notifications/read-all`,
        {
          method: "PATCH",
          credentials: "include",
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: (id: number) =>
      fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/cms/notifications/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const clearAllMutation = useMutation({
    mutationFn: () =>
      fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/cms/notifications`, {
        method: "DELETE",
        credentials: "include",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return {
    notifications: (data?.data as Notification[]) || [],
    unreadCount: data?.unreadCount || 0,
    isLoading,
    refetch,
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllAsReadMutation.mutate,
    deleteNotification: deleteNotificationMutation.mutate,
    clearAll: clearAllMutation.mutate,
  };
};
