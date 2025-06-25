
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Edit, Trash2, Mail, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockUsers = [
  {
    id: 1,
    name: "John Admin",
    email: "john@camstore.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15"
  },
  {
    id: 2,
    name: "Sarah Cashier",
    email: "sarah@camstore.com",
    role: "cashier",
    status: "active",
    lastLogin: "2024-01-15"
  },
  {
    id: 3,
    name: "Mike Warehouse",
    email: "mike@camstore.com",
    role: "warehouse",
    status: "inactive",
    lastLogin: "2024-01-10"
  }
];

export const UserManagementModal = ({ isOpen, onClose }: UserManagementModalProps) => {
  const [users, setUsers] = useState(mockUsers);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "cashier"
  });
  const { toast } = useToast();

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const user = {
      id: users.length + 1,
      ...newUser,
      status: "active",
      lastLogin: "Never"
    };

    setUsers([...users, user]);
    setNewUser({ name: "", email: "", role: "cashier" });
    setIsAddingUser(false);
    
    toast({
      title: "User Added",
      description: `${newUser.name} has been added successfully.`,
    });
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(u => u.id !== userId));
    toast({
      title: "User Deleted",
      description: "User has been removed successfully.",
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-100 text-red-800";
      case "cashier": return "bg-blue-100 text-blue-800";
      case "warehouse": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Users className="mr-2" size={20} />
            User Management
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add User Button */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Manage users and their permissions</p>
            <Button onClick={() => setIsAddingUser(true)}>
              <Plus size={16} className="mr-2" />
              Add User
            </Button>
          </div>

          {/* Add User Form */}
          {isAddingUser && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-4">Add New User</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Full Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="cashier">Cashier</SelectItem>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button onClick={handleAddUser}>Add User</Button>
                <Button variant="outline" onClick={() => setIsAddingUser(false)}>Cancel</Button>
              </div>
            </div>
          )}

          {/* Users Table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium">User</th>
                  <th className="text-left p-4 font-medium">Role</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Last Login</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail size={12} className="mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={getRoleColor(user.role)}>
                        <Shield size={12} className="mr-1" />
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{user.lastLogin}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit size={14} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
