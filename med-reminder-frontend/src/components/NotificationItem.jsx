const NotificationItem = ({ notification, onClick }) => {
  return (
    <div
      className={`px-4 py-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-100 transition ${
        notification.isRead ? "bg-gray-50" : "bg-white font-semibold"
      }`}
      onClick={onClick}
    >
      <div className="text-sm text-gray-800">{notification.message}</div>
      <div className="text-xs text-gray-400 mt-1">
        {new Date(notification.sendAt).toLocaleString()}
      </div>
    </div>
  );
};

export default NotificationItem;
