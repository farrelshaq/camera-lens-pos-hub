
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { CurrentOrders } from "@/components/dashboard/CurrentOrders";
import { OrderDetails } from "@/components/orders/OrderDetails";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

const Index = () => {
  const [currentOrder, setCurrentOrder] = useState([]);
  const navigate = useNavigate();

  const updateOrderItem = (productId, quantity) => {
    if (quantity <= 0) {
      setCurrentOrder(currentOrder.filter(item => item.id !== productId));
    } else {
      setCurrentOrder(currentOrder.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 lg:p-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6 h-full">
            {/* Left Section - Orders */}
            <div className="xl:col-span-2 space-y-4 lg:space-y-6">
              <CurrentOrders />
              
              {/* Business Dashboard Button */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <Button 
                  onClick={() => navigate('/dashboard')} 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all hover:scale-105"
                >
                  <BarChart3 size={20} className="mr-2" />
                  View Business Dashboard
                </Button>
              </div>
            </div>

            {/* Right Section - Order Details */}
            <div className="xl:col-span-1">
              <OrderDetails 
                orderItems={currentOrder}
                onUpdateItem={updateOrderItem}
                onClearOrder={() => setCurrentOrder([])}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
