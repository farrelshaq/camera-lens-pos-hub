
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import { StorageService } from "@/lib/storage";

const revenueData = [
  { name: 'Jan', revenue: 450000000, orders: 120, profit: 67500000, loss: 0 },
  { name: 'Feb', revenue: 520000000, orders: 140, profit: 78000000, loss: 5000000 },
  { name: 'Mar', revenue: 480000000, orders: 135, profit: 72000000, loss: 3000000 },
  { name: 'Apr', revenue: 610000000, orders: 165, profit: 91500000, loss: 2000000 },
  { name: 'May', revenue: 550000000, orders: 150, profit: 82500000, loss: 4000000 },
  { name: 'Jun', revenue: 670000000, orders: 180, profit: 100500000, loss: 1500000 },
];

const categoryData = [
  { name: 'Camera', value: 35, amount: 850000000, color: '#10b981' },
  { name: 'Lens', value: 28, amount: 680000000, color: '#3b82f6' },
  { name: 'Accessories', value: 20, amount: 480000000, color: '#f59e0b' },
  { name: 'Tripod', value: 10, amount: 240000000, color: '#ef4444' },
  { name: 'Flash', value: 7, amount: 170000000, color: '#8b5cf6' },
];

const DashboardPage = () => {
  const [timePeriod, setTimePeriod] = useState("monthly");
  const [financialData, setFinancialData] = useState(StorageService.getFinancialData());

  useEffect(() => {
    // Load financial data from storage
    const data = StorageService.getFinancialData();
    setFinancialData(data);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const totalProfit = revenueData.reduce((sum, month) => sum + month.profit, 0);
  const totalLoss = revenueData.reduce((sum, month) => sum + month.loss, 0);
  const netProfit = totalProfit - totalLoss;

  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(3280000000),
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Net Profit",
      value: formatCurrency(netProfit),
      change: "+15.8%",
      trend: "up",
      icon: TrendingUp,
      color: "text-emerald-600"
    },
    {
      title: "Total Orders",
      value: "890",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600"
    },
    {
      title: "Total Loss",
      value: formatCurrency(totalLoss),
      change: "-18.3%",
      trend: "down",
      icon: TrendingDown,
      color: "text-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 lg:p-6">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Business Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300">Monitor your camera store performance</p>
              </div>
              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4 lg:p-6 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
            {/* Revenue Chart */}
            <Card className="lg:col-span-2 p-4 lg:p-6 dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Revenue & Profit/Loss Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                  <Bar dataKey="profit" fill="#3b82f6" name="Profit" />
                  <Bar dataKey="loss" fill="#ef4444" name="Loss" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Category Distribution */}
            <Card className="p-4 lg:p-6 dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Revenue by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="dark:text-gray-300">{item.name}</span>
                    </div>
                    <span className="font-medium dark:text-white">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Additional Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <Card className="p-4 lg:p-6 dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Orders Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-4 lg:p-6 dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Top Selling Products</h3>
              <div className="space-y-4">
                {[
                  { name: "Canon EOS R5", sold: 45, revenue: 675000000 },
                  { name: "Sony FX3", sold: 38, revenue: 570000000 },
                  { name: "Canon RF 24-70mm", sold: 32, revenue: 480000000 },
                  { name: "Tripod Manfrotto", sold: 28, revenue: 140000000 },
                ].map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium dark:text-white">{product.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{product.sold} units sold</p>
                    </div>
                    <span className="font-semibold dark:text-white">{formatCurrency(product.revenue)}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
