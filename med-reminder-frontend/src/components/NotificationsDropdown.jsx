import NotificationItem from "./NotificationItem";
import { markNotificationAsRead } from "../services/notificationService";
import { useEffect } from "react";
import { io } from "socket.io-client";

const userId = localStorage.getItem("userId");
const socket = io("http://localhost:3000", {
  query: { userId },
});

const NotificationsDropdown = ({ notifications, setNotifications }) => {
  useEffect(() => {
    socket.on("notification", (newNotif) => {
      setNotifications((prev) => [newNotif, ...prev]);
    });

    return () => {
      socket.off("notification");
    };
  }, [setNotifications]);

  const handleClick = async (notification) => {
    if (!notification.isRead) {
      await markNotificationAsRead(notification.id);
      setNotifications(
        notifications.map((n) =>
          n.id === notification.id ? { ...n, isRead: true } : n
        )
      );
    }
    // Optional: redirect based on type
    if (notification.type === "APPOINTMENT")
      window.location.href = "/appointments";
    if (notification.type === "MEDICATION")
      window.location.href = "/medications";
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg border rounded z-50 max-h-80 overflow-y-auto">
      {notifications.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No notifications</div>
      ) : (
        notifications.map((n) => (
          <NotificationItem
            key={n.id}
            notification={n}
            onClick={() => handleClick(n)}
          />
        ))
      )}
    </div>
  );
};

export default NotificationsDropdown;
