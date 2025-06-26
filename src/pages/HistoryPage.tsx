import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Download, 
  Calendar as CalendarIcon,
  Filter,
  Eye,
  ExternalLink
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const mockTransactions = [
  {
    id: "TXN001",
    date: "2024-01-15",
    customer: "John Doe",
    items: ["Canon EOS R5", "RF 24-70mm f/2.8L"],
    total: 82500000,
    payment: "Credit Card",
    status: "completed"
  },
  {
    id: "TXN002",
    date: "2024-02-01",
    customer: "Alice Smith",
    items: ["Sony FX3 Cinema Camera", "FE 24-70mm f/2.8 GM"],
    total: 67800000,
    payment: "Cash",
    status: "completed"
  },
  {
    id: "TXN003",
    date: "2024-02-10",
    customer: "Bob Johnson",
    items: ["Nikon Z 7II", "NIKKOR Z 24-70mm f/2.8 S"],
    total: 73200000,
    payment: "Bank Transfer",
    status: "pending"
  },
  {
    id: "TXN004",
    date: "2024-03-01",
    customer: "Emily White",
    items: ["DJI Ronin-S", "Zoom H6 Recorder"],
    total: 12400000,
    payment: "QRIS",
    status: "completed"
  },
  {
    id: "TXN005",
    date: "2024-03-15",
    customer: "David Brown",
    items: ["Godox AD200Pro", "MagMod Basic Kit"],
    total: 4850000,
    payment: "Credit Card",
    status: "cancelled"
  },
  {
    id: "TXN006",
    date: "2024-04-01",
    customer: "Sophia Green",
    items: ["Manfrotto Befree Tripod", "Peak Design Slide Strap"],
    total: 3200000,
    payment: "Cash",
    status: "completed"
  },
  {
    id: "TXN007",
    date: "2024-04-10",
    customer: "Ryan Black",
    items: ["SanDisk Extreme Pro 128GB", "Rode VideoMic Pro+"],
    total: 2100000,
    payment: "Bank Transfer",
    status: "completed"
  },
  {
    id: "TXN008",
    date: "2024-05-01",
    customer: "Olivia Gray",
    items: ["Sigma 18-35mm f/1.8", "Tiffen Variable ND Filter"],
    total: 9500000,
    payment: "QRIS",
    status: "pending"
  },
  {
    id: "TXN009",
    date: "2024-05-15",
    customer: "Daniel Blue",
    items: ["Blackmagic Pocket Cinema 6K", "SmallRig Cage"],
    total: 38900000,
    payment: "Credit Card",
    status: "completed"
  },
  {
    id: "TXN010",
    date: "2024-06-01",
    customer: "Ava Red",
    items: ["Panasonic GH5", "Metabones Speed Booster"],
    total: 26700000,
    payment: "Cash",
    status: "completed"
  }
];

const HistoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [dateRange, setDateRange] = useState<any>({ from: null, to: null });
  const [exportedLink, setExportedLink] = useState("");
  const { toast } = useToast();

  const handleExport = () => {
    // Generate a sample Google Sheets link (in real implementation, this would create an actual spreadsheet)
    const spreadsheetId = "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms";
    const link = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit#gid=0`;
    
    setExportedLink(link);
    
    toast({
      title: "Export Successful",
      description: "Transaction history has been exported to Google Sheets",
    });
  };

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || transaction.payment === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>
                <p className="text-gray-600">View and manage your sales history</p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleExport}
                  className="bg-emerald-500 hover:bg-emerald-600 transition-all hover:scale-105"
                >
                  <Download size={20} className="mr-2" />
                  Export History
                </Button>
                {exportedLink && (
                  <Button 
                    variant="outline"
                    onClick={() => window.open(exportedLink, '_blank')}
                    className="hover:scale-105 transition-transform"
                  >
                    <ExternalLink size={20} className="mr-2" />
                    Open Spreadsheet
                  </Button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 min-w-64"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="QRIS">QRIS</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="hover:scale-105 transition-transform">
                    <CalendarIcon size={20} className="mr-2" />
                    Date Range
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={(range) => setDateRange(range || { from: null, to: null })}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Photo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-800">{transaction.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{transaction.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-800">{transaction.customer}</div>
                    </td>
                    <td className="px-6 py-4">
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {transaction.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img 
                        src="https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400" 
                        alt="Product" 
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-800">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        }).format(transaction.total)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{transaction.payment}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={transaction.status === 'completed' ? 'bg-green-100 text-green-800' : transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button variant="ghost" size="sm">
                        <Eye size={16} className="mr-2" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HistoryPage;
