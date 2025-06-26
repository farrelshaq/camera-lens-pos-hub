
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const currentOrders = [
  {
    id: "ID1902",
    customer: "Michael Jordan",
    lastItem: "Canon EOS R5",
    items: [
      { name: "Canon EOS R5", price: 67500000, quantity: 1, image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400" },
      { name: "Canon RF 24-70mm f/2.8L", price: 15000000, quantity: 1, image: "https://images.unsplash.com/photo-1606983340119-67ad295b3a8d?w=400" }
    ],
    total: 82500000,
    date: "2024-06-26",
    status: "completed"
  },
  {
    id: "ID8591",
    customer: "Sujiwo Bejo",
    lastItem: "Sony FX3 Cinema Camera",
    items: [
      { name: "Sony FX3 Cinema Camera", price: 45000000, quantity: 1, image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400" },
      { name: "Sony FE 24-70mm f/2.8 GM", price: 22800000, quantity: 1, image: "https://images.unsplash.com/photo-1606983340119-67ad295b3a8d?w=400" }
    ],
    total: 67800000,
    date: "2024-06-26",
    status: "processing"
  },
  {
    id: "ID7712",
    customer: "Dere Rizkani",
    lastItem: "Nikon Z 7II",
    items: [
      { name: "Nikon Z 7II", price: 48200000, quantity: 1, image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400" },
      { name: "NIKKOR Z 24-70mm f/2.8 S", price: 25000000, quantity: 1, image: "https://images.unsplash.com/photo-1606983340119-67ad295b3a8d?w=400" }
    ],
    total: 73200000,
    date: "2024-06-26",
    status: "processing"
  },
  {
    id: "ID8912",
    customer: "Filipus Seris",
    lastItem: "DJI Ronin-S",
    items: [
      { name: "DJI Ronin-S", price: 9900000, quantity: 1, image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400" },
      { name: "Zoom H6 Recorder", price: 2500000, quantity: 1, image: "https://images.unsplash.com/photo-1606983340119-67ad295b3a8d?w=400" }
    ],
    total: 12400000,
    date: "2024-06-26",
    status: "pending"
  }
];

const OrderDetailModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl z-10 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Order Details - {order.id}</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Customer</p>
              <p className="font-medium text-gray-900 dark:text-white">{order.customer}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
              <p className="font-medium text-gray-900 dark:text-white">{order.date}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Items Purchased</p>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t dark:border-gray-600 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CurrentOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-4 lg:p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 lg:mb-6">Current Order</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentOrders.map((order) => (
              <button
                key={order.id}
                onClick={() => handleOrderClick(order)}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 relative hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer text-left w-full"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{order.id}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    order.status === 'completed' ? 'bg-emerald-500' : 'bg-emerald-100 dark:bg-emerald-900'
                  }`}>
                    <div className={`w-4 h-4 rounded-full ${
                      order.status === 'completed' ? 'bg-white' : 'bg-emerald-600'
                    }`}></div>
                  </div>
                </div>
                
                <h3 className="font-medium text-gray-800 dark:text-white mb-1">{order.customer}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{order.lastItem}</p>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{order.items.length} Items</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{formatCurrency(order.total)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <OrderDetailModal 
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
