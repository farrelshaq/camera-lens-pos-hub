
import { Bell, Search, Settings, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { NotificationPanel } from "@/components/notifications/NotificationPanel";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ResponsiveHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleNotificationClick = () => {
    setShowNotifications(true);
    setNotificationCount(0);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Search - Responsive */}
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-400" size={isMobile ? 14 : 16} />
              <Input
                placeholder={isMobile ? "Search..." : "Search menu..."}
                className={cn(
                  "pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600",
                  isMobile && "text-sm"
                )}
              />
            </div>
          </div>

          {/* Actions - Responsive */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size={isMobile ? "sm" : "sm"}
                onClick={handleNotificationClick}
                className="relative hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Bell size={isMobile ? 18 : 20} className="text-gray-600 dark:text-gray-300" />
                {notificationCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Profile - Responsive */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <div className={cn(
                    "bg-emerald-500 rounded-full flex items-center justify-center",
                    isMobile ? "w-6 h-6" : "w-8 h-8"
                  )}>
                    <User size={isMobile ? 12 : 16} className="text-white" />
                  </div>
                  {!isMobile && (
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                      Admin User
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleProfileClick}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <NotificationPanel 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
};
