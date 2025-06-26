
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Menu, 
  Database, 
  Settings, 
  Clock,
  Package,
  X,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: BarChart3, label: "POS", path: "/" },
  { icon: Package, label: "Menu", path: "/menu" },
  { icon: Database, label: "Stock", path: "/stock" },
  { icon: Clock, label: "History", path: "/history" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const ResponsiveSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setCollapsed(false);
      setMobileOpen(false);
    }
  }, [isMobile, location.pathname]);

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => setMobileOpen(false);

  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMobile}
          className="fixed top-4 left-4 z-50 lg:hidden bg-white dark:bg-gray-800 shadow-md"
        >
          <Menu size={20} />
        </Button>

        {/* Mobile Overlay */}
        {mobileOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeMobile}
          />
        )}

        {/* Mobile Sidebar */}
        <div className={cn(
          "fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {/* Mobile Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="font-bold text-xl text-gray-800 dark:text-white">CamPOS</span>
            </div>
            <Button variant="ghost" size="sm" onClick={closeMobile}>
              <X size={20} />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      closeMobile();
                    }}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                      location.pathname === item.path
                        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700 shadow-sm" 
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white"
                    )}
                  >
                    <item.icon size={20} className="flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </>
    );
  }

  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col hidden lg:flex",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Desktop Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center transition-transform hover:scale-110">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          {!collapsed && <span className="font-bold text-xl text-gray-800 dark:text-white">CamPOS</span>}
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105",
                  location.pathname === item.path
                    ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700 shadow-sm" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white"
                )}
              >
                <item.icon size={20} className="transition-transform flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Collapse Toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
        >
          <Menu size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};
