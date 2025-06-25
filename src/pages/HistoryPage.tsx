import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Search, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Package,
  Users,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HistoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [exportUrl, setExportUrl] = useState("");
  const { toast } = useToast();

  const [historyData, setHistoryData] = useState([
    { 
      id: 1, 
      date: "2024-01-15", 
      customer: "Michael Jordan", 
      items: 3, 
      total: 25000000, 
      type: "sale", 
      status: "completed" 
    },
    { 
      id: 2, 
      date: "2024-01-14", 
      customer: "Sujiwo Tejo", 
      items: 5, 
      total: 17500000, 
      type: "sale", 
      status: "completed" 
    },
    { 
      id: 3, 
      date: "2024-01-13", 
      customer: "Butet Kertaradjasa", 
      items: 2, 
      total: 7000000, 
      type: "refund", 
      status: "completed" 
    },
    { 
      id: 4, 
      date: "2024-01-12", 
      customer: "Agus Noor", 
      items: 4, 
      total: 32000000, 
      type: "sale", 
      status: "completed" 
    },
    { 
      id: 5, 
      date: "2024-01-11", 
      customer: "Cak Nun", 
      items: 1, 
      total: 9500000, 
      type: "sale", 
      status: "completed" 
    },
  ]);

  const filteredHistory = historyData.filter(item =>
    item.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSales = historyData
    .filter(item => item.type === "sale")
    .reduce((sum, item) => sum + item.total, 0);

  const totalRefunds = historyData
    .filter(item => item.type === "refund")
    .reduce((sum, item) => sum + item.total, 0);

  const handleExportHistory = () => {
    // Generate or use existing export URL
    const newExportUrl = exportUrl || `https://camstore.com/exports/history-${Date.now()}.csv`;
    setExportUrl(newExportUrl);
    
    toast({
      title: "History Exported",
      description: (
        <div className="space-y-2">
          <p>History has been exported successfully!</p>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open(newExportUrl, '_blank')}
              className="text-xs"
            >
              <ExternalLink size={12} className="mr-1" />
              Open Export
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(newExportUrl);
                toast({ title: "Link Copied!", description: "Export link copied to clipboard" });
              }}
              className="text-xs"
            >
              Copy Link
            </Button>
          </div>
        </div>
      ),
      duration: 10000,
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
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <Calendar className="text-blue-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Total Transactions</p>
                    <p className="text-xl font-bold">{historyData.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <TrendingUp className="text-green-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Total Sales</p>
                    <p className="text-xl font-bold">Rp {(totalSales / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <DollarSign className="text-red-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Total Refunds</p>
                    <p className="text-xl font-bold">Rp {(totalRefunds / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search transaction history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>
              <p className="text-gray-600">View and analyze your sales history</p>
            </div>
            <div className="flex space-x-3">
              {exportUrl && (
                <Button 
                  variant="outline" 
                  onClick={() => window.open(exportUrl, '_blank')}
                  className="hover:scale-105 transition-transform"
                >
                  <ExternalLink size={20} className="mr-2" />
                  View Export
                </Button>
              )}
              <Button onClick={handleExportHistory} className="bg-emerald-500 hover:bg-emerald-600 hover:scale-105 transition-all">
                <Download size={20} className="mr-2" />
                Export History
              </Button>
            </div>
          </div>

          {/* History Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Items</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHistory.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">{item.date}</td>
                        <td className="py-4 px-4">{item.customer}</td>
                        <td className="py-4 px-4">{item.items}</td>
                        <td className="py-4 px-4">Rp {item.total.toLocaleString('id-ID')}</td>
                        <td className="py-4 px-4">
                          <Badge className={item.type === "sale" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                            {item.type}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">{item.status}</td>
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

export default HistoryPage;
