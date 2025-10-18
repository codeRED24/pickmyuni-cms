// pickmyuni-cms/src/components/NotificationManager.tsx
import { useEffect } from "react";
import { useGetIdentity, useUpdate } from "ra-core";
import { generateToken } from "../firebase.config";

export const NotificationManager = () => {
  const { data: user } = useGetIdentity();
  const [update] = useUpdate();

  useEffect(() => {
    if (user) {
      generateToken().then((token) => {
        if (token) {
          // Check if the token is already saved
          if (user.fcmToken !== token) {
            update("authors", { id: user.id, data: { fcm_token: token } });
          }
        }
      });
    }
  }, [user, update]);

  return null;
};
