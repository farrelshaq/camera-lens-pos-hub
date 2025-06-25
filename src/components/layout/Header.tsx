
import { useState } from "react";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { NotificationPanel } from "@/components/notifications/NotificationPanel";

export const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search menu, customers, orders..."
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative hover:scale-105 transition-transform"
              onClick={() => setIsNotificationOpen(true)}
            >
              <Bell size={20} />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-red-500 hover:bg-red-600">
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform">
              <User size={20} />
            </Button>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">Admin Store</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>
      </header>

      <NotificationPanel
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
};
