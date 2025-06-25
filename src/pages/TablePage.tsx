
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Users, 
  Clock, 
  Coffee,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TablePage = () => {
  const [tables, setTables] = useState([
    { id: 1, number: "T01", seats: 4, status: "available", customer: null, orderTime: null },
    { id: 2, number: "T02", seats: 2, status: "occupied", customer: "John Doe", orderTime: "12:30" },
    { id: 3, number: "T03", seats: 6, status: "reserved", customer: "Jane Smith", orderTime: "13:00" },
    { id: 4, number: "T04", seats: 4, status: "available", customer: null, orderTime: null },
    { id: 5, number: "T05", seats: 8, status: "occupied", customer: "Bob Wilson", orderTime: "12:45" },
    { id: 6, number: "T06", seats: 2, status: "cleaning", customer: null, orderTime: null },
  ]);

  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800 border-green-200";
      case "occupied": return "bg-red-100 text-red-800 border-red-200";
      case "reserved": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cleaning": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available": return <CheckCircle size={16} />;
      case "occupied": return <Users size={16} />;
      case "reserved": return <Clock size={16} />;
      case "cleaning": return <Coffee size={16} />;
      default: return null;
    }
  };

  const handleTableClick = (table: any) => {
    toast({
      title: `Table ${table.number}`,
      description: `Status: ${table.status}. Customer management feature coming soon!`,
    });
  };

  const statusCounts = {
    available: tables.filter(t => t.status === "available").length,
    occupied: tables.filter(t => t.status === "occupied").length,
    reserved: tables.filter(t => t.status === "reserved").length,
    cleaning: tables.filter(t => t.status === "cleaning").length,
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
                <h1 className="text-2xl font-bold text-gray-800">Table Management</h1>
                <p className="text-gray-600">Manage customer seating and reservations</p>
              </div>
              <Button className="bg-emerald-500 hover:bg-emerald-600 hover:scale-105 transition-all">
                <Plus size={20} className="mr-2" />
                Add Table
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Available</p>
                    <p className="text-xl font-bold">{statusCounts.available}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <Users className="text-red-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Occupied</p>
                    <p className="text-xl font-bold">{statusCounts.occupied}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <Clock className="text-yellow-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Reserved</p>
                    <p className="text-xl font-bold">{statusCounts.reserved}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <Coffee className="text-blue-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Cleaning</p>
                    <p className="text-xl font-bold">{statusCounts.cleaning}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table Grid */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tables.map((table) => (
                <div
                  key={table.id}
                  onClick={() => handleTableClick(table)}
                  className="relative bg-gray-50 rounded-lg p-6 border-2 border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                      table.status === "available" ? "bg-green-100" :
                      table.status === "occupied" ? "bg-red-100" :
                      table.status === "reserved" ? "bg-yellow-100" : "bg-blue-100"
                    }`}>
                      <span className="text-lg font-bold">{table.number}</span>
                    </div>
                    
                    <Badge className={`mb-2 ${getStatusColor(table.status)}`}>
                      <span className="flex items-center space-x-1">
                        {getStatusIcon(table.status)}
                        <span className="capitalize">{table.status}</span>
                      </span>
                    </Badge>
                    
                    <p className="text-sm text-gray-600 mb-1">{table.seats} seats</p>
                    
                    {table.customer && (
                      <div className="text-xs text-gray-500">
                        <p className="font-medium">{table.customer}</p>
                        <p>Since {table.orderTime}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TablePage;
