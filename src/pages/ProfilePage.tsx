
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Save, User, Store, MapPin, Phone, Mail, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    userName: "Admin User",
    storeName: "Camera Store Pro",
    address: "Jl. Sudirman No. 123, Jakarta",
    phone: "+62 21 1234 5678",
    email: "admin@camerastore.com",
    description: "Professional camera equipment store serving photographers since 2020"
  });

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully!",
    });
  };

  const handleChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Profile</h1>
                  <p className="text-gray-600 dark:text-gray-300">Manage your personal and store information</p>
                </div>
                <Button onClick={handleSave} className="bg-emerald-500 hover:bg-emerald-600">
                  <Save size={20} className="mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Picture Section */}
              <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="text-center">
                  <div className="w-32 h-32 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera size={48} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{profileData.userName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{profileData.storeName}</p>
                  <Button variant="outline" className="w-full">
                    <Camera size={16} className="mr-2" />
                    Change Photo
                  </Button>
                </div>
              </Card>

              {/* Profile Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <User className="text-emerald-500 mr-3" size={24} />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        User Name
                      </label>
                      <Input
                        value={profileData.userName}
                        onChange={(e) => handleChange('userName', e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <Input
                        value={profileData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="Enter your email"
                        type="email"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <Store className="text-emerald-500 mr-3" size={24} />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Store Information</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Store Name
                      </label>
                      <Input
                        value={profileData.storeName}
                        onChange={(e) => handleChange('storeName', e.target.value)}
                        placeholder="Enter store name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <Input
                        value={profileData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Store description"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <MapPin className="text-emerald-500 mr-3" size={24} />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Address
                      </label>
                      <Input
                        value={profileData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        placeholder="Enter store address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <Input
                        value={profileData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="Enter phone number"
                        type="tel"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
