
import { useState } from "react";
import { Camera, Package, Settings } from "lucide-react";
import { CategoryManagementModal } from "./CategoryManagementModal";

const initialCategories = [
  { id: "all", name: "All menu", icon: Package },
  { id: "camera", name: "Camera", icon: Camera, products: ["Canon EOS R5", "Sony FX3", "Nikon Z9"] },
  { id: "lens", name: "Lens", icon: Settings, products: ["Canon RF 24-70mm", "Sony FE 85mm", "Nikon Z 50mm"] },
  { id: "accessories", name: "Accessories", icon: Package, products: ["Camera Bag", "Lens Filter", "Remote Control"] },
  { id: "used", name: "Used Items", icon: Settings, products: ["Used Canon 5D", "Used Sony A7", "Used Nikon D850"] },
  { id: "tripod", name: "Tripod", icon: Package, products: ["Manfrotto 190", "Gitzo Carbon", "Benro Travel"] },
  { id: "flash", name: "Flash", icon: Settings, products: ["Canon Speedlite", "Godox V1", "Profoto A10"] },
  { id: "memory", name: "Memory Card", icon: Package, products: ["SanDisk 128GB", "Lexar 64GB", "Sony 256GB"] },
];

export const ProductCategories = ({ selectedCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState(initialCategories);
  const [showManagement, setShowManagement] = useState(false);

  const handleUpdateCategories = (updatedCategories) => {
    setCategories([categories[0], ...updatedCategories]); // Keep "All menu" as first item
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search menu"
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button 
            onClick={() => setShowManagement(true)}
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Settings size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex flex-col items-center p-4 rounded-lg transition-all ${
              selectedCategory === category.id
                ? "bg-emerald-50 border-2 border-emerald-200 text-emerald-600"
                : "bg-gray-50 hover:bg-gray-100 text-gray-600"
            }`}
          >
            <div className={`p-3 rounded-full mb-2 ${
              selectedCategory === category.id ? "bg-emerald-100" : "bg-white"
            }`}>
              <category.icon size={24} />
            </div>
            <span className="text-sm font-medium text-center">{category.name}</span>
            {category.products && (
              <span className="text-xs text-gray-500 mt-1">
                {category.products.length} items
              </span>
            )}
          </button>
        ))}
      </div>

      <CategoryManagementModal
        isOpen={showManagement}
        onClose={() => setShowManagement(false)}
        onUpdateCategories={handleUpdateCategories}
      />
    </div>
  );
};
