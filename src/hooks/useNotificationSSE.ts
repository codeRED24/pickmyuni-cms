import { useEffect, useState, useCallback, useRef } from "react";
import { useGetIdentity } from "ra-core";

interface Notification {
  id: number;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

export const useNotificationSSE = () => {
  const { data: user } = useGetIdentity();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Fetch initial notifications
  const fetchNotifications = useCallback(async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/cms/notifications`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      setNotifications(data.data || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, [user]);

  // Connect to SSE
  useEffect(() => {
    if (!user) return;

    const connectSSE = () => {
      const eventSource = new EventSource(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/cms/notifications/stream`,
        { withCredentials: true }
      );

      eventSource.onopen = () => {
        console.log("SSE connected");
        setIsConnected(true);
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          switch (data.type) {
            case "connected":
              console.log("SSE connection established");
              break;

            case "notification":
              // Add new notification to the list
              setNotifications((prev) => [data.data, ...prev]);
              setUnreadCount((prev) => prev + 1);
              break;

            case "unread_count":
              // Update unread count
              setUnreadCount(data.count);
              break;

            default:
              console.log("Unknown SSE event:", data);
          }
        } catch (error) {
          console.error("Error parsing SSE message:", error);
        }
      };

      eventSource.onerror = (error) => {
        console.error("SSE error:", error);
        setIsConnected(false);
        eventSource.close();

        // Reconnect after 5 seconds
        setTimeout(connectSSE, 5000);
      };

      eventSourceRef.current = eventSource;
    };

    connectSSE();
    fetchNotifications();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [user, fetchNotifications]);

  // Mark notification as read
  const markAsRead = useCallback(async (id: number) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/v1/cms/notifications/${id}/read`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/cms/notifications/read-all`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      if (response.ok) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  }, []);

  // Delete notification
  const deleteNotification = useCallback(async (id: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/cms/notifications/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  }, []);

  // Clear all notifications
  const clearAll = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/cms/notifications`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  }, []);

  return {
    notifications,
    unreadCount,
    isConnected,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    refetch: fetchNotifications,
  };
};
