
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  AlertTriangle, 
  Package, 
  TrendingUp, 
  TrendingDown,
  Download,
  Minus,
  Edit,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StockPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const [stockData, setStockData] = useState([
    { 
      id: 1, 
      name: "Canon EOS R5", 
      category: "Camera", 
      stock: 5, 
      minStock: 2, 
      status: "good", 
      price: 65000000, 
      lastUpdate: "2024-01-15",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop"
    },
    { 
      id: 2, 
      name: "Sony FX3", 
      category: "Camera", 
      stock: 1, 
      minStock: 2, 
      status: "low", 
      price: 85000000, 
      lastUpdate: "2024-01-14",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop"
    },
    { 
      id: 3, 
      name: "Canon RF 24-70mm", 
      category: "Lens", 
      stock: 0, 
      minStock: 1, 
      status: "out", 
      price: 22000000, 
      lastUpdate: "2024-01-13",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop"
    },
    { 
      id: 4, 
      name: "Tripod Manfrotto", 
      category: "Accessories", 
      stock: 8, 
      minStock: 3, 
      status: "good", 
      price: 3500000, 
      lastUpdate: "2024-01-15",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=100&fit=crop"
    },
    { 
      id: 5, 
      name: "Sony 85mm f/1.4 GM", 
      category: "Lens", 
      stock: 4, 
      minStock: 2, 
      status: "good", 
      price: 21000000, 
      lastUpdate: "2024-01-15",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop"
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-green-100 text-green-800";
      case "low": return "bg-yellow-100 text-yellow-800";
      case "out": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const updateStock = (id: number, change: number) => {
    setStockData(prev => prev.map(item => {
      if (item.id === id) {
        const newStock = Math.max(0, item.stock + change);
        const newStatus = newStock === 0 ? "out" : newStock <= item.minStock ? "low" : "good";
        toast({
          title: "Stock Updated",
          description: `${item.name} stock updated to ${newStock}`,
        });
        return { ...item, stock: newStock, status: newStatus, lastUpdate: new Date().toISOString().split('T')[0] };
      }
      return item;
    }));
  };

  const handleExportStock = () => {
    toast({
      title: "Stock Exported",
      description: "Stock report has been downloaded successfully!",
    });
  };

  const handleAddStock = () => {
    toast({
      title: "Add New Stock",
      description: "New stock entry form will be available soon!",
    });
  };

  const handleEditStock = (item: any) => {
    toast({
      title: "Edit Stock",
      description: `Edit form for ${item.name} will be available soon!`,
    });
  };

  const handleDeleteStock = (item: any) => {
    setStockData(prev => prev.filter(stock => stock.id !== item.id));
    toast({
      title: "Stock Deleted",
      description: `${item.name} has been removed from inventory.`,
    });
  };

  const filteredStock = stockData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusCounts = {
    total: stockData.length,
    low: stockData.filter(item => item.status === "low").length,
    out: stockData.filter(item => item.status === "out").length,
    value: stockData.reduce((sum, item) => sum + (item.price * item.stock), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Stock Management</h1>
                <p className="text-gray-600">Monitor and manage your inventory levels</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={handleExportStock} className="hover:scale-105 transition-transform">
                  <Download size={20} className="mr-2" />
                  Export
                </Button>
                <Button onClick={handleAddStock} className="bg-emerald-500 hover:bg-emerald-600 hover:scale-105 transition-all">
                  <Plus size={20} className="mr-2" />
                  Add Stock
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <Package className="text-blue-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Total Items</p>
                    <p className="text-xl font-bold">{statusCounts.total}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <AlertTriangle className="text-yellow-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Low Stock</p>
                    <p className="text-xl font-bold">{statusCounts.low}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <TrendingUp className="text-green-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Stock Value</p>
                    <p className="text-xl font-bold">Rp {(statusCounts.value / 1000000000).toFixed(1)}B</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <TrendingDown className="text-red-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Out of Stock</p>
                    <p className="text-xl font-bold">{statusCounts.out}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search stock items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Stock Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Stock</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Update</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStock.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{item.category}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStock(item.id, -1)}
                              className="h-8 w-8 p-0"
                              disabled={item.stock === 0}
                            >
                              <Minus size={12} />
                            </Button>
                            <span className="font-medium w-8 text-center">{item.stock}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStock(item.id, 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus size={12} />
                            </Button>
                            <span className="text-gray-500 text-sm ml-1">/ {item.minStock} min</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={`${getStatusColor(item.status)} border-0`}>
                            {item.status === "good" ? "Good" : item.status === "low" ? "Low Stock" : "Out of Stock"}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 font-medium">
                          Rp {item.price.toLocaleString('id-ID')}
                        </td>
                        <td className="py-4 px-4 text-gray-600">{item.lastUpdate}</td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditStock(item)}
                              className="hover:scale-105 transition-transform"
                            >
                              <Edit size={14} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteStock(item)}
                              className="hover:scale-105 transition-transform text-red-600 hover:text-red-700"
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default StockPage;
