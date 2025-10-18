// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlwC5HAtVCH73t0UfaAzWc6N37mRoCHYc",
  authDomain: "pickmuni-cms.firebaseapp.com",
  projectId: "pickmuni-cms",
  storageBucket: "pickmuni-cms.firebasestorage.app",
  messagingSenderId: "448594174495",
  appId: "1:448594174495:web:71812261eaa9f6614a6b2a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Handle foreground messages
onMessage(messaging, (payload) => {
  console.log("Received foreground message:", payload);
  // Guard against undefined notification and provide defaults
  const title = payload.notification?.title ?? "Notification";
  const body = payload.notification?.body ?? "";
  new Notification(title, { body });
});

export { messaging };
export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  // console.log({ permission });

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BHa1_90Pn1swXKY9F-S1CXXlTG-71u8_Pa6jTIuIR4xmulmf3Pug0ojK-F0Q4q8HY9wVJ5aiykdmBUCD7GadSsU",
    });
    // console.log(token);
    return token;
  }
};
