
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Download, 
  Eye,
  Calendar,
  TrendingUp,
  CreditCard,
  Package
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HistoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const { toast } = useToast();

  const mockTransactions = [
    { 
      id: "TRX001", 
      date: "2024-01-15", 
      time: "14:30",
      customer: "John Doe", 
      items: ["Canon EOS R5", "RF 24-70mm"], 
      total: 87000000, 
      payment: "credit_card", 
      status: "completed",
      cashier: "Sania"
    },
    { 
      id: "TRX002", 
      date: "2024-01-15", 
      time: "13:45",
      customer: "Jane Smith", 
      items: ["Sony FX3"], 
      total: 85000000, 
      payment: "transfer", 
      status: "completed",
      cashier: "Sania"
    },
    { 
      id: "TRX003", 
      date: "2024-01-14", 
      time: "16:20",
      customer: "Bob Wilson", 
      items: ["Tripod Manfrotto", "Memory Card"], 
      total: 4500000, 
      payment: "cash", 
      status: "completed",
      cashier: "Ahmad"
    },
    { 
      id: "TRX004", 
      date: "2024-01-14", 
      time: "11:15",
      customer: "Alice Brown", 
      items: ["Canon RF 50mm"], 
      total: 18000000, 
      payment: "e_wallet", 
      status: "refunded",
      cashier: "Sania"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "refunded": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentMethod = (method: string) => {
    switch (method) {
      case "cash": return "Cash";
      case "credit_card": return "Credit Card";
      case "transfer": return "Bank Transfer";
      case "e_wallet": return "E-Wallet";
      default: return method;
    }
  };

  const handleViewTransaction = (id: string) => {
    toast({
      title: "Transaction Details",
      description: `Viewing details for transaction ${id}`,
    });
  };

  const handleExportHistory = () => {
    toast({
      title: "Export Successful",
      description: "Transaction history has been exported to Excel",
    });
  };

  const totalRevenue = mockTransactions
    .filter(t => t.status === "completed")
    .reduce((sum, t) => sum + t.total, 0);

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
                <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>
                <p className="text-gray-600">View and manage all transaction records</p>
              </div>
              <Button variant="outline" onClick={handleExportHistory} className="hover:scale-105 transition-transform">
                <Download size={20} className="mr-2" />
                Export History
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <TrendingUp className="text-green-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-lg font-bold">Rp {totalRevenue.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <Package className="text-blue-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-xl font-bold">{mockTransactions.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <CreditCard className="text-purple-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-xl font-bold">{mockTransactions.filter(t => t.status === "completed").length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <Calendar className="text-orange-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Today</p>
                    <p className="text-xl font-bold">{mockTransactions.filter(t => t.date === "2024-01-15").length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="max-w-40"
              />
              <Button variant="outline" className="hover:scale-105 transition-transform">
                <Filter size={20} className="mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Transaction Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Transaction ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date & Time</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Items</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Payment</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 font-medium text-blue-600">{transaction.id}</td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium">{transaction.date}</p>
                            <p className="text-sm text-gray-600">{transaction.time}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">{transaction.customer}</td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            {transaction.items.slice(0, 2).map((item, index) => (
                              <p key={index} className="text-gray-600">{item}</p>
                            ))}
                            {transaction.items.length > 2 && (
                              <p className="text-gray-500">+{transaction.items.length - 2} more</p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 font-medium">
                          Rp {transaction.total.toLocaleString('id-ID')}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {getPaymentMethod(transaction.payment)}
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={`${getStatusColor(transaction.status)} border-0`}>
                            {transaction.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleViewTransaction(transaction.id)}
                            className="hover:scale-105 transition-transform"
                          >
                            <Eye size={16} />
                          </Button>
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

export default HistoryPage;
