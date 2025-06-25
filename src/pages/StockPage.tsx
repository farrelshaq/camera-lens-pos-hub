
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
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StockPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const mockStockData = [
    { id: 1, name: "Canon EOS R5", category: "Camera", stock: 5, minStock: 2, status: "good", price: 65000000, lastUpdate: "2024-01-15" },
    { id: 2, name: "Sony FX3", category: "Camera", stock: 1, minStock: 2, status: "low", price: 85000000, lastUpdate: "2024-01-14" },
    { id: 3, name: "Canon RF 24-70mm", category: "Lens", stock: 0, minStock: 1, status: "out", price: 22000000, lastUpdate: "2024-01-13" },
    { id: 4, name: "Tripod Manfrotto", category: "Accessories", stock: 8, minStock: 3, status: "good", price: 3500000, lastUpdate: "2024-01-15" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-green-100 text-green-800";
      case "low": return "bg-yellow-100 text-yellow-800";
      case "out": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleExportStock = () => {
    toast({
      title: "Stock Exported",
      description: "Stock report has been downloaded successfully!",
    });
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
                <Button className="bg-emerald-500 hover:bg-emerald-600 hover:scale-105 transition-all">
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
                    <p className="text-xl font-bold">14</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <AlertTriangle className="text-yellow-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Low Stock</p>
                    <p className="text-xl font-bold">1</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <TrendingUp className="text-green-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Stock Value</p>
                    <p className="text-xl font-bold">2.1B</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <TrendingDown className="text-red-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Out of Stock</p>
                    <p className="text-xl font-bold">1</p>
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
                    </tr>
                  </thead>
                  <tbody>
                    {mockStockData.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 font-medium">{item.name}</td>
                        <td className="py-4 px-4 text-gray-600">{item.category}</td>
                        <td className="py-4 px-4">
                          <span className="font-medium">{item.stock}</span>
                          <span className="text-gray-500 text-sm ml-1">/ {item.minStock} min</span>
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
