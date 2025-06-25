
import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Menu, 
  Database, 
  Settings, 
  Clock, 
  Users,
  Package,
  Wallet
} from "lucide-react";

const menuItems = [
  { icon: Menu, label: "Dashboard", active: true },
  { icon: Package, label: "Menu", active: false },
  { icon: Database, label: "Stock", active: false },
  { icon: Users, label: "Table", active: false },
  { icon: Clock, label: "History", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
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
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                  item.active 
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200" 
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <item.icon size={20} />
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
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Menu size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};
