import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductDetailModal } from "./ProductDetailModal";
import { ShoppingCart, Eye, Heart, Plus, Minus } from "lucide-react";

const mockProducts = [
  {
    id: 1,
    name: "Canon EOS R5",
    category: "camera",
    price: 65000000,
    originalPrice: 70000000,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    stock: 5,
    condition: "new",
    rating: 4.8,
    discount: 7
  },
  {
    id: 2,
    name: "Sony FX3 Cinema Camera",
    category: "camera",
    price: 85000000,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    stock: 3,
    condition: "new",
    rating: 4.9
  },
  {
    id: 3,
    name: "Canon RF 24-70mm f/2.8L",
    category: "lens",
    price: 22000000,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    stock: 2,
    condition: "used",
    rating: 4.5,
    discount: 28
  },
  {
    id: 5,
    name: "Tripod Manfrotto Professional",
    category: "accessories",
    price: 3500000,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
    stock: 12,
    condition: "new",
    rating: 4.6
  },
  {
    id: 6,
    name: "Sony 85mm f/1.4 GM",
    category: "lens",
    price: 21000000,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop",
    stock: 4,
    condition: "new",
    rating: 4.9
  },
  {
    id: 7,
    name: "Nikon Z9 Mirrorless",
    category: "camera",
    price: 72000000,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    stock: 3,
    condition: "new",
    rating: 4.8
  },
  {
    id: 8,
    name: "Canon 50mm f/1.2L RF",
    category: "lens",
    price: 32000000,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    stock: 6,
    condition: "new",
    rating: 4.9
  },
  {
    id: 9,
    name: "Sony A7 IV",
    category: "camera",
    price: 28000000,
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=300&fit=crop",
    stock: 7,
    condition: "new",
    rating: 4.7
  },
  {
    id: 10,
    name: "Fujifilm X-T5",
    category: "camera",
    price: 23000000,
    originalPrice: 25000000,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    stock: 4,
    condition: "new",
    rating: 4.6,
    discount: 8
  },
  {
    id: 11,
    name: "Sigma 70-200mm f/2.8 DG DN",
    category: "lens",
    price: 18000000,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    stock: 5,
    condition: "new",
    rating: 4.5
  },
  {
    id: 12,
    name: "Camera Bag Peak Design",
    category: "accessories",
    price: 2500000,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    stock: 15,
    condition: "new",
    rating: 4.4
  },
  {
    id: 13,
    name: "Used Nikon D850",
    category: "camera",
    price: 22000000,
    originalPrice: 35000000,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    stock: 1,
    condition: "used",
    rating: 4.3,
    discount: 37
  },
  {
    id: 14,
    name: "Godox Flash V1",
    category: "accessories",
    price: 4500000,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
    stock: 8,
    condition: "new",
    rating: 4.6
  },
  {
    id: 15,
    name: "Tamron 28-75mm f/2.8 Di III RXD",
    category: "lens",
    price: 8500000,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop",
    stock: 9,
    condition: "new",
    rating: 4.4
  },
  {
    id: 16,
    name: "Memory Card SanDisk 128GB",
    category: "accessories",
    price: 850000,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    stock: 25,
    condition: "new",
    rating: 4.7
  }
];

interface ProductGridProps {
  selectedCategory: string;
  onAddToOrder: (product: any) => void;
  searchQuery?: string;
  viewMode?: "grid" | "list";
  onUpdateStock?: (productId: number, newStock: number) => void;
  appliedFilters?: any;
}

export const ProductGrid = ({ 
  selectedCategory, 
  onAddToOrder, 
  searchQuery = "", 
  viewMode = "grid",
  onUpdateStock,
  appliedFilters = null
}: ProductGridProps) => {
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply additional filters if provided
    if (appliedFilters) {
      const matchesCondition = appliedFilters.condition.length === 0 || 
        appliedFilters.condition.includes(product.condition === "new" ? "New" : "Used");
      
      const matchesPrice = product.price >= appliedFilters.priceRange[0] && 
        product.price <= appliedFilters.priceRange[1];
      
      const matchesStock = !appliedFilters.inStock || product.stock > 0;
      
      return matchesCategory && matchesSearch && matchesCondition && matchesPrice && matchesStock;
    }
    
    return matchesCategory && matchesSearch;
  });

  const updateStock = (productId: number, change: number) => {
    setProducts(prev => prev.map(product => {
      if (product.id === productId) {
        const newStock = Math.max(0, product.stock + change);
        onUpdateStock?.(productId, newStock);
        return { ...product, stock: newStock };
      }
      return product;
    }));
  };

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

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
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-600">Stock:</span>
                        <div className="flex items-center space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStock(product.id, -1)}
                            className="h-6 w-6 p-0"
                          >
                            <Minus size={12} />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{product.stock}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStock(product.id, 1)}
                            className="h-6 w-6 p-0"
                          >
                            <Plus size={12} />
                          </Button>
                        </div>
                      </div>
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
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart size={16} className="mr-1" />
                      {product.stock === 0 ? "Out of Stock" : "Add"}
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
    <>
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
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <Badge variant="destructive" className="text-white">Out of Stock</Badge>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
              
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-gray-600">Stock:</span>
                  <div className="flex items-center space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStock(product.id, -1)}
                      className="h-6 w-6 p-0"
                    >
                      <Minus size={12} />
                    </Button>
                    <span className="text-sm font-medium w-6 text-center">{product.stock}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStock(product.id, 1)}
                      className="h-6 w-6 p-0"
                    >
                      <Plus size={12} />
                    </Button>
                  </div>
                </div>
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 hover:scale-105 transition-transform"
                  onClick={() => handleViewProduct(product)}
                >
                  <Eye size={16} />
                </Button>
                <Button 
                  onClick={() => onAddToOrder(product)}
                  size="sm"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 hover:scale-105 transition-all"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart size={16} className="mr-1" />
                  {product.stock === 0 ? "Habis" : "Add"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProductDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        product={selectedProduct}
        onAddToOrder={onAddToOrder}
      />
    </>
  );
};
