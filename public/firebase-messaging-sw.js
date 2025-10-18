// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBlwC5HAtVCH73t0UfaAzWc6N37mRoCHYc",
  authDomain: "pickmuni-cms.firebaseapp.com",
  projectId: "pickmuni-cms",
  storageBucket: "pickmuni-cms.firebasestorage.app",
  messagingSenderId: "448594174495",
  appId: "1:448594174495:web:71812261eaa9f6614a6b2a",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    // actions: payload.notification.actions || [],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  // self.addEventListener("notificationclick", function (event) {
  //   const clickAction = event.notification.data?.click_action;

  //   console.log(event.notification);

  //   event.notification.close();

  //   if (clickAction) {
  //     event.waitUntil(
  //       clients.matchAll({ type: "window" }).then(function (clientList) {
  //         for (const client of clientList) {
  //           if (client.url === clickAction && "focus" in client) {
  //             return client.focus();
  //           }
  //         }
  //         if (clients.openWindow) {
  //           return clients.openWindow(clickAction);
  //         }
  //       })
  //     );
  //   }
  // });
});
