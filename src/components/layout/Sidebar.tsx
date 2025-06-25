
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Menu, 
  Database, 
  Settings, 
  Clock,
  Package,
} from "lucide-react";

const menuItems = [
  { icon: Menu, label: "POS", path: "/" },
  { icon: Package, label: "Menu", path: "/menu" },
  { icon: Database, label: "Stock", path: "/stock" },
  { icon: Clock, label: "History", path: "/history" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center transition-transform hover:scale-110">
            {collapsed ? (
              <span className="text-white font-bold text-sm">C</span>
            ) : (
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            )}
          </div>
          {!collapsed && <span className="font-bold text-xl text-gray-800">CamPOS</span>}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105",
                  location.pathname === item.path
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                )}
              >
                <item.icon size={20} className="transition-transform" />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105"
        >
          <Menu size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};
