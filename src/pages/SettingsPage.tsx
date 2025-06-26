
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { SubscriptionCard } from "@/components/subscription/SubscriptionCard";
import { UserManagementModal } from "@/components/settings/UserManagementModal";
import { useTheme } from "@/contexts/ThemeContext";
import { 
  User, 
  Store, 
  Bell, 
  Shield, 
  Printer,
  Save,
  Settings as SettingsIcon,
  Moon,
  Sun,
  Users,
  Zap,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SuccessModal = ({ isOpen, onClose, title, message }: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  message: string; 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl z-10 max-w-sm mx-auto text-center" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{message}</p>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    storeName: "Camera Store Pro",
    storeAddress: "Jl. Sudirman No. 123, Jakarta",
    storePhone: "+62 21 1234 5678",
    notifications: true,
    autoBackup: true,
    printReceipts: true,
    lowStockAlert: true,
    currency: "IDR",
  });

  const [showSubscription, setShowSubscription] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: "", message: "" });
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully!",
    });
  };

  const handleBackupData = () => {
    setSuccessMessage({
      title: "Backup Successful!",
      message: "Your data has been backed up successfully."
    });
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };

  const handleTestPrinter = () => {
    setSuccessMessage({
      title: "Printer Test Successful!",
      message: "Test print completed successfully."
    });
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };

  const settingSections = [
    {
      title: "Store Information",
      icon: Store,
      items: [
        { label: "Store Name", key: "storeName", type: "input" },
        { label: "Address", key: "storeAddress", type: "input" },
        { label: "Phone", key: "storePhone", type: "input" },
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { label: "Enable Notifications", key: "notifications", type: "switch" },
        { label: "Low Stock Alerts", key: "lowStockAlert", type: "switch" },
      ]
    },
    {
      title: "System",
      icon: SettingsIcon,
      items: [
        { label: "Auto Backup", key: "autoBackup", type: "switch" },
        { label: "Print Receipts", key: "printReceipts", type: "switch" },
        { label: "Dark Mode", key: "darkMode", type: "switch", customHandler: toggleTheme, value: theme === 'dark' },
      ]
    }
  ];

  if (showSubscription) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <div className="flex items-center mb-6">
              <Button variant="outline" onClick={() => setShowSubscription(false)} className="mr-4">
                ← Back to Settings
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Subscription Plans</h1>
                <p className="text-gray-600 dark:text-gray-300">Choose the perfect plan for your business</p>
              </div>
            </div>
            <SubscriptionCard />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-gray-600 dark:text-gray-300">Manage your store preferences and configurations</p>
              </div>
              <Button onClick={handleSaveSettings} className="bg-emerald-500 hover:bg-emerald-600 hover:scale-105 transition-all">
                <Save size={20} className="mr-2" />
                Save Changes
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              {settingSections.map((section, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <section.icon className="text-emerald-500 mr-3" size={24} />
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h2>
                    </div>
                    
                    <div className="space-y-4">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                            {item.key === "darkMode" && (
                              <div className="mr-2">
                                {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                              </div>
                            )}
                            {item.label}
                          </label>
                          {item.type === "input" ? (
                            <Input
                              value={settings[item.key as keyof typeof settings] as string}
                              onChange={(e) => setSettings({
                                ...settings,
                                [item.key]: e.target.value
                              })}
                              className="max-w-xs"
                            />
                          ) : (
                            <Switch
                              checked={item.customHandler ? item.value : settings[item.key as keyof typeof settings] as boolean}
                              onCheckedChange={(checked) => {
                                if (item.customHandler) {
                                  item.customHandler();
                                } else {
                                  setSettings({
                                    ...settings,
                                    [item.key]: checked
                                  });
                                }
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {/* Account Info */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center mb-4">
                  <User className="text-emerald-500 mr-3" size={24} />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Account Info</h2>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Plan</p>
                    <p className="font-medium text-gray-900 dark:text-white">Free Plan</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Valid Until</p>
                    <p className="font-medium text-gray-900 dark:text-white">Unlimited</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 hover:scale-105 transition-transform"
                    onClick={() => setShowSubscription(true)}
                  >
                    <Zap size={16} className="mr-2" />
                    Upgrade Plan
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start hover:scale-105 transition-transform"
                    onClick={handleBackupData}
                  >
                    <Shield size={16} className="mr-2" />
                    Backup Data
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start hover:scale-105 transition-transform"
                    onClick={handleTestPrinter}
                  >
                    <Printer size={16} className="mr-2" />
                    Test Printer
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start hover:scale-105 transition-transform"
                    onClick={() => setShowUserManagement(true)}
                  >
                    <Users size={16} className="mr-2" />
                    Manage Users
                  </Button>
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Status</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Database</span>
                    <span className="flex items-center text-green-600 dark:text-green-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Online
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Printer</span>
                    <span className="flex items-center text-green-600 dark:text-green-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Connected
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Last Backup</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <UserManagementModal
        isOpen={showUserManagement}
        onClose={() => setShowUserManagement(false)}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={successMessage.title}
        message={successMessage.message}
      />
    </div>
  );
};

export default SettingsPage;
