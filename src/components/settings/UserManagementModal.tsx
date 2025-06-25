import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Edit2, Save, UserPlus, Mail, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserManagementModal = ({ isOpen, onClose }: UserManagementModalProps) => {
  const [users, setUsers] = useState([
    { id: 1, name: "Admin Store", email: "admin@camerapro.com", role: "Admin", status: "Active" },
    { id: 2, name: "John Manager", email: "john@camerapro.com", role: "Manager", status: "Active" },
    { id: 3, name: "Sarah Cashier", email: "sarah@camerapro.com", role: "Cashier", status: "Inactive" },
  ]);
  
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Cashier" });
  const { toast } = useToast();

  const handleEditStart = (user) => {
    setEditingId(user.id);
    setEditingName(user.name);
  };

  const handleEditSave = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, name: editingName } : user
    ));
    setEditingId(null);
    setEditingName("");
    toast({
      title: "User Updated",
      description: "User name has been updated successfully.",
    });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const user = {
      id: users.length + 1,
      ...newUser,
      status: "Active"
    };
    
    setUsers([...users, user]);
    setNewUser({ name: "", email: "", role: "Cashier" });
    
    toast({
      title: "User Added",
      description: `${user.name} has been added successfully.`,
    });
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin": return "bg-red-100 text-red-800";
      case "Manager": return "bg-blue-100 text-blue-800";
      case "Cashier": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center">
            <Shield className="mr-2" size={20} />
            User Management
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <div className="p-4 space-y-4 max-h-full overflow-y-auto">
          {/* Add New User */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium mb-3 flex items-center">
              <UserPlus size={16} className="mr-2" />
              Add New User
            </h3>
            <div className="space-y-3">
              <Input
                placeholder="Full name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              <Input
                placeholder="Email address"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              <select
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="Cashier">Cashier</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
              <Button onClick={handleAddUser} className="w-full">
                <Plus size={16} className="mr-2" />
                Add User
              </Button>
            </div>
          </div>

          {/* Existing Users */}
          <div>
            <h3 className="font-medium mb-3">Existing Users</h3>
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="bg-white border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      {editingId === user.id ? (
                        <div className="flex items-center space-x-2">
                          <Input
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="flex-1"
                          />
                          <Button size="sm" onClick={() => handleEditSave(user.id)}>
                            <Save size={14} />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{user.name}</h4>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditStart(user)}
                            className="h-6 w-6 p-0"
                          >
                            <Edit2 size={12} />
                          </Button>
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Mail size={12} className="mr-1" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
