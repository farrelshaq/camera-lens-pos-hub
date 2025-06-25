
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react";

const revenueData = [
  { name: 'Jan', revenue: 45000000, orders: 120 },
  { name: 'Feb', revenue: 52000000, orders: 140 },
  { name: 'Mar', revenue: 48000000, orders: 135 },
  { name: 'Apr', revenue: 61000000, orders: 165 },
  { name: 'May', revenue: 55000000, orders: 150 },
  { name: 'Jun', revenue: 67000000, orders: 180 },
];

const categoryData = [
  { name: 'Camera', value: 35, amount: 85000000, color: '#10b981' },
  { name: 'Lens', value: 28, amount: 68000000, color: '#3b82f6' },
  { name: 'Accessories', value: 20, amount: 48000000, color: '#f59e0b' },
  { name: 'Tripod', value: 10, amount: 24000000, color: '#ef4444' },
  { name: 'Flash', value: 7, amount: 17000000, color: '#8b5cf6' },
];

const DashboardPage = () => {
  const [timePeriod, setTimePeriod] = useState("monthly");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(328000000),
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
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
      title: "Active Customers",
      value: "1,245",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Products Sold",
      value: "2,850",
      change: "-2.1%",
      trend: "down",
      icon: Package,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Business Dashboard</h1>
                <p className="text-gray-600">Monitor your camera store performance</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue Chart */}
            <Card className="lg:col-span-2 p-6">
              <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="revenue" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Category Distribution */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Revenue by Category</h3>
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
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Additional Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Orders Trend</h3>
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

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
              <div className="space-y-4">
                {[
                  { name: "Canon EOS R5", sold: 45, revenue: 67500000 },
                  { name: "Sony FX3", sold: 38, revenue: 57000000 },
                  { name: "Canon RF 24-70mm", sold: 32, revenue: 48000000 },
                  { name: "Tripod Manfrotto", sold: 28, revenue: 14000000 },
                ].map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sold} units sold</p>
                    </div>
                    <span className="font-semibold">{formatCurrency(product.revenue)}</span>
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
