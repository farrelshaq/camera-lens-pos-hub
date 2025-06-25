
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye, Heart } from "lucide-react";

const mockProducts = [
  {
    id: 1,
    name: "Canon EOS R5",
    category: "camera",
    price: 65000000,
    originalPrice: 70000000,
    image: "/placeholder.svg",
    stock: 5,
    condition: "new",
    rating: 4.8,
    discount: 7
  },
  {
    id: 2,
    name: "Sony FX3",
    category: "camera",
    price: 85000000,
    image: "/placeholder.svg",
    stock: 3,
    condition: "new",
    rating: 4.9
  },
  {
    id: 3,
    name: "Canon RF 24-70mm f/2.8L",
    category: "lens",
    price: 22000000,
    image: "/placeholder.svg",
    stock: 8,
    condition: "new",
    rating: 4.7
  },
  {
    id: 4,
    name: "Used Canon 5D Mark IV",
    category: "camera",
    price: 18000000,
    originalPrice: 25000000,
    image: "/placeholder.svg",
    stock: 2,
    condition: "used",
    rating: 4.5,
    discount: 28
  },
  {
    id: 5,
    name: "Tripod Manfrotto",
    category: "accessories",
    price: 3500000,
    image: "/placeholder.svg",
    stock: 12,
    condition: "new",
    rating: 4.6
  },
  {
    id: 6,
    name: "Sony 85mm f/1.4 GM",
    category: "lens",
    price: 21000000,
    image: "/placeholder.svg",
    stock: 4,
    condition: "new",
    rating: 4.9
  },
];

interface ProductGridProps {
  selectedCategory: string;
  onAddToOrder: (product: any) => void;
  searchQuery?: string;
  viewMode?: "grid" | "list";
}

export const ProductGrid = ({ 
  selectedCategory, 
  onAddToOrder, 
  searchQuery = "", 
  viewMode = "grid" 
}: ProductGridProps) => {
  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant={product.condition === "new" ? "default" : "secondary"}>
                        {product.condition === "new" ? "New" : "Used"}
                      </Badge>
                      <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                      <span className="text-sm text-yellow-600">★ {product.rating}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-emerald-600">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                      {product.originalPrice && (
                        <>
                          <span className="text-sm text-gray-500 line-through">
                            Rp {product.originalPrice.toLocaleString('id-ID')}
                          </span>
                          <Badge className="bg-red-100 text-red-800">{product.discount}% OFF</Badge>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                      <Eye size={16} />
                    </Button>
                    <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                      <Heart size={16} />
                    </Button>
                    <Button 
                      onClick={() => onAddToOrder(product)}
                      size="sm"
                      className="bg-emerald-500 hover:bg-emerald-600 hover:scale-105 transition-all"
                    >
                      <ShoppingCart size={16} className="mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <div key={product.id} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200 hover:scale-105">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            {product.discount && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-red-500 hover:bg-red-600 text-white">
                  {product.discount}% OFF
                </Badge>
              </div>
            )}
            <div className="absolute top-2 right-2">
              <Badge variant={product.condition === "new" ? "default" : "secondary"}>
                {product.condition === "new" ? "New" : "Used"}
              </Badge>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Stock: {product.stock}</span>
              <span className="text-sm text-yellow-600">★ {product.rating}</span>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-emerald-600">
                  Rp {product.price.toLocaleString('id-ID')}
                </span>
              </div>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  Rp {product.originalPrice.toLocaleString('id-ID')}
                </span>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1 hover:scale-105 transition-transform">
                <Eye size={16} />
              </Button>
              <Button 
                onClick={() => onAddToOrder(product)}
                size="sm"
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 hover:scale-105 transition-all"
              >
                <ShoppingCart size={16} className="mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
