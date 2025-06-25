
import { Camera, Package, Settings } from "lucide-react";

const categories = [
  { id: "all", name: "All menu", icon: Package },
  { id: "camera", name: "Camera", icon: Camera },
  { id: "lens", name: "Lens", icon: Settings },
  { id: "accessories", name: "Accessories", icon: Package },
  { id: "used", name: "Used Items", icon: Settings },
  { id: "tripod", name: "Tripod", icon: Package },
  { id: "flash", name: "Flash", icon: Settings },
  { id: "memory", name: "Memory Card", icon: Package },
];

export const ProductCategories = ({ selectedCategory, onCategoryChange }) => {
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
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
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
          </button>
        ))}
      </div>
    </div>
  );
};
