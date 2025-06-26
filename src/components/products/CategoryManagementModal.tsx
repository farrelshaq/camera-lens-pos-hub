
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Edit2, Trash2, Camera, Package, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LucideIcon } from "lucide-react";

interface CategoryManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateCategories: (categories: any[]) => void;
}

interface CategoryType {
  id: string;
  name: string;
  icon: LucideIcon;
}

const iconOptions = [
  { name: "Camera", icon: Camera },
  { name: "Package", icon: Package },
  { name: "Settings", icon: Settings },
];

export const CategoryManagementModal = ({ isOpen, onClose, onUpdateCategories }: CategoryManagementModalProps) => {
  const [categories, setCategories] = useState<CategoryType[]>([
    { id: "camera", name: "Camera", icon: Camera },
    { id: "lens", name: "Lens", icon: Settings },
    { id: "accessories", name: "Accessories", icon: Package },
    { id: "used", name: "Used Items", icon: Settings },
    { id: "tripod", name: "Tripod", icon: Package },
    { id: "flash", name: "Flash", icon: Settings },
    { id: "memory", name: "Memory Card", icon: Package },
  ]);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<LucideIcon>(Camera);
  const { toast } = useToast();

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newCategory: CategoryType = {
      id: newCategoryName.toLowerCase().replace(/\s+/g, '-'),
      name: newCategoryName,
      icon: selectedIcon
    };
    
    setCategories([...categories, newCategory]);
    setNewCategoryName("");
    setSelectedIcon(Camera);
    
    toast({
      title: "Category Added",
      description: `${newCategoryName} has been added successfully.`,
    });
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
    toast({
      title: "Category Deleted",
      description: "Category has been removed successfully.",
    });
  };

  const handleSave = () => {
    onUpdateCategories(categories);
    onClose();
    toast({
      title: "Categories Updated",
      description: "Your categories have been saved successfully.",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Manage Categories</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <div className="p-4 space-y-4 max-h-full overflow-y-auto">
          {/* Add New Category */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium mb-3">Add New Category</h3>
            <div className="space-y-3">
              <Input
                placeholder="Category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <div>
                <p className="text-sm text-gray-600 mb-2">Select Icon:</p>
                <div className="flex space-x-2">
                  {iconOptions.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedIcon === option.icon ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedIcon(option.icon)}
                    >
                      <option.icon size={16} />
                    </Button>
                  ))}
                </div>
              </div>
              <Button onClick={handleAddCategory} className="w-full">
                <Plus size={16} className="mr-2" />
                Add Category
              </Button>
            </div>
          </div>

          {/* Existing Categories */}
          <div>
            <h3 className="font-medium mb-3">Existing Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-lg">
                      <category.icon size={16} />
                    </div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit2 size={14} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button onClick={handleSave} className="w-full">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
