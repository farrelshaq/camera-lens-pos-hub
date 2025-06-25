
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { CurrentOrders } from "@/components/dashboard/CurrentOrders";
import { ProductCategories } from "@/components/products/ProductCategories";
import { ProductGrid } from "@/components/products/ProductGrid";
import { OrderDetails } from "@/components/orders/OrderDetails";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentOrder, setCurrentOrder] = useState([]);

  const addToOrder = (product) => {
    const existingItem = currentOrder.find(item => item.id === product.id);
    if (existingItem) {
      setCurrentOrder(currentOrder.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCurrentOrder([...currentOrder, { ...product, quantity: 1 }]);
    }
  };

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
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
            {/* Left Section - Orders and Products */}
            <div className="xl:col-span-2 space-y-6">
              <CurrentOrders />
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6">
                  <ProductCategories 
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                  />
                  <ProductGrid 
                    selectedCategory={selectedCategory}
                    onAddToOrder={addToOrder}
                  />
                </div>
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
