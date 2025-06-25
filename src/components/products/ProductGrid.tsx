
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Canon EOS R5",
    category: "camera",
    type: "Camera",
    price: 2299,
    image: "/placeholder.svg",
    badge: "Best seller",
    status: "new"
  },
  {
    id: 2,
    name: "Sony FX3 Cinema",
    category: "camera", 
    type: "Camera",
    price: 1299,
    image: "/placeholder.svg",
    badge: "Best seller",
    status: "new"
  },
  {
    id: 3,
    name: "Canon RF 24-70mm",
    category: "lens",
    type: "Lens",
    price: 490,
    image: "/placeholder.svg",
    badge: "Best seller",
    status: "new"
  },
  {
    id: 4,
    name: "Sony FE 85mm f/1.4",
    category: "lens",
    type: "Lens", 
    price: 225,
    image: "/placeholder.svg",
    badge: "Best seller",
    status: "new"
  },
  {
    id: 5,
    name: "Manfrotto Tripod",
    category: "accessories",
    type: "Accessories",
    price: 189,
    image: "/placeholder.svg",
    status: "new"
  },
  {
    id: 6,
    name: "Godox Flash V1",
    category: "flash",
    type: "Flash",
    price: 279,
    image: "/placeholder.svg",
    status: "new"
  },
  {
    id: 7,
    name: "SanDisk 128GB CF",
    category: "memory",
    type: "Memory",
    price: 89,
    image: "/placeholder.svg",
    status: "new"
  },
  {
    id: 8,
    name: "Canon 5D Mark IV (Used)",
    category: "used",
    type: "Camera",
    price: 1299,
    image: "/placeholder.svg",
    status: "used",
    condition: "Grade A"
  }
];

export const ProductGrid = ({ selectedCategory, onAddToOrder }) => {
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                ⭐ {product.badge}
              </span>
            )}
            {product.condition && (
              <span className="absolute top-3 right-3 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                {product.condition}
              </span>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <Button
                onClick={() => onAddToOrder(product)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full w-12 h-12 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100"
              >
                <Plus size={20} />
              </Button>
            </div>
          </div>
          
          <div className="p-4">
            <p className="text-xs text-gray-500 mb-1">{product.type}</p>
            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">${product.price}</span>
              {product.status === "used" && (
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                  Used
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
