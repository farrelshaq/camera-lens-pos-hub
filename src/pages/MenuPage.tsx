
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ProductCategories } from "@/components/products/ProductCategories";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleAddProduct = () => {
    toast({
      title: "Add New Product",
      description: "Product creation feature will be available soon!",
    });
  };

  const addToOrder = (product: any) => {
    if (product.stock === 0) {
      toast({
        title: "Out of Stock",
        description: `${product.name} is currently out of stock.`,
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Added to Order",
      description: `${product.name} has been added to your order.`,
    });
  };

  const handleStockUpdate = (productId: number, newStock: number) => {
    toast({
      title: "Stock Updated",
      description: `Product stock updated to ${newStock}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Product Menu</h1>
                <p className="text-gray-600">Manage your camera products and inventory</p>
              </div>
              <Button onClick={handleAddProduct} className="bg-emerald-500 hover:bg-emerald-600 transition-all duration-200 hover:scale-105">
                <Plus size={20} className="mr-2" />
                Add Product
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="hover:scale-105 transition-transform">
                <Filter size={20} className="mr-2" />
                Filter
              </Button>
              <div className="flex border border-gray-200 rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid size={16} />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List size={16} />
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <ProductCategories 
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              <ProductGrid 
                selectedCategory={selectedCategory}
                onAddToOrder={addToOrder}
                searchQuery={searchQuery}
                viewMode={viewMode}
                onUpdateStock={handleStockUpdate}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MenuPage;
