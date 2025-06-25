
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Store, 
  Bell, 
  Shield, 
  CreditCard, 
  Printer,
  Save,
  Settings as SettingsIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
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

  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully!",
    });
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
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                <p className="text-gray-600">Manage your store preferences and configurations</p>
              </div>
              <Button onClick={handleSaveSettings} className="bg-emerald-500 hover:bg-emerald-600 hover:scale-105 transition-all">
                <Save size={20} className="mr-2" />
                Save Changes
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Settings Sections */}
            <div className="xl:col-span-2 space-y-6">
              {settingSections.map((section, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <section.icon className="text-emerald-500 mr-3" size={24} />
                      <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
                    </div>
                    
                    <div className="space-y-4">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">
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
                              checked={settings[item.key as keyof typeof settings] as boolean}
                              onCheckedChange={(checked) => setSettings({
                                ...settings,
                                [item.key]: checked
                              })}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions & Info */}
            <div className="space-y-6">
              {/* Account Info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <User className="text-emerald-500 mr-3" size={24} />
                  <h2 className="text-lg font-semibold text-gray-800">Account Info</h2>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Plan</p>
                    <p className="font-medium">Pro Plan</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Valid Until</p>
                    <p className="font-medium">March 15, 2024</p>
                  </div>
                  <Button variant="outline" className="w-full mt-4 hover:scale-105 transition-transform">
                    <CreditCard size={16} className="mr-2" />
                    Manage Subscription
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start hover:scale-105 transition-transform">
                    <Shield size={16} className="mr-2" />
                    Backup Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:scale-105 transition-transform">
                    <Printer size={16} className="mr-2" />
                    Test Printer
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:scale-105 transition-transform">
                    <User size={16} className="mr-2" />
                    Manage Users
                  </Button>
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">System Status</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Database</span>
                    <span className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Online
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Printer</span>
                    <span className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Connected
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Backup</span>
                    <span className="text-sm text-gray-600">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
