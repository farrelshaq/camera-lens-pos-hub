
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Bell, AlertTriangle, Package, TrendingDown, Clock } from "lucide-react";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications = [
  {
    id: 1,
    type: "warning",
    title: "Low Stock Alert",
    message: "Sony FX3 stock is running low (1 remaining)",
    time: "5 minutes ago",
    icon: AlertTriangle,
  },
  {
    id: 2,
    type: "error",
    title: "Out of Stock",
    message: "Canon RF 24-70mm is out of stock",
    time: "1 hour ago",
    icon: Package,
  },
  {
    id: 3,
    type: "info",
    title: "New Order",
    message: "Michael Jordan placed a new order #ID1902",
    time: "2 hours ago",
    icon: Bell,
  },
  {
    id: 4,
    type: "warning",
    title: "Payment Due",
    message: "Premium subscription expires in 3 days",
    time: "1 day ago",
    icon: Clock,
  },
];

export const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "error": return "text-red-600 bg-red-50";
      case "warning": return "text-yellow-600 bg-yellow-50";
      case "info": return "text-blue-600 bg-blue-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center">
            <Bell className="mr-2" size={20} />
            Notifications
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <div className="p-4 space-y-3 max-h-full overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bell size={48} className="mx-auto mb-4 opacity-50" />
              <p>No new notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="bg-gray-50 rounded-lg p-3 relative">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                    <notification.icon size={16} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{notification.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                    className="absolute top-2 right-2 h-6 w-6 p-0"
                  >
                    <X size={12} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
