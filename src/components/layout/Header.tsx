
import { Search, User, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const Header = () => {
  const [notifications] = useState(3);
  const { toast } = useToast();

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 new notifications to review.",
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors" size={20} />
            <Input
              placeholder="Search products, customers, orders..."
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleNotificationClick}
              className="hover:scale-110 transition-transform"
            >
              <Bell size={20} className="text-gray-600" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                  {notifications}
                </Badge>
              )}
            </Button>
          </div>

          {/* Settings */}
          <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform">
            <Settings size={20} className="text-gray-600" />
          </Button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              <User size={16} className="text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">Sania</p>
              <p className="text-xs text-gray-500">Cashier</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
