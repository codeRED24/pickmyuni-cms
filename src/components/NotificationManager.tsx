import { useEffect } from "react";
import { useGetIdentity } from "ra-core";
import { generateToken } from "../firebase.config";
import { getDeviceId } from "../utils/deviceId";

const BACKEND_URL = import.meta.env.VITE_APP_API_URL;

export const NotificationManager = () => {
  const { data: user } = useGetIdentity();

  useEffect(() => {
    if (user) {
      generateToken().then((token) => {
        if (token) {
          const deviceId = getDeviceId();
          // Check if the token is already saved
          if (user.fcmToken !== token) {
            fetch(`${BACKEND_URL}/api/v1/cms/authors/update-fcm-token`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ fcmToken: token, deviceId }),
            });
          }
        }
      });
    }
  }, [user]);

  return null;
};