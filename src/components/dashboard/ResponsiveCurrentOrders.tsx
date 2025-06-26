
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderDetailsModal } from "@/components/orders/OrderDetailsModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const mockOrders = [
  {
    id: "ORD001",
    customer: "Andi Wijaya",
    items: [
      { name: "Canon EOS R5", quantity: 1, price: 50000000 },
      { name: "RF 24-70mm f/2.8L", quantity: 1, price: 32500000 }
    ],
    total: 82500000,
    time: "09:30",
    status: "processing" as const,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400"
  },
  {
    id: "ORD002", 
    customer: "Sari Dewi",
    items: [
      { name: "Sony FX3 Cinema Camera", quantity: 1, price: 45000000 },
      { name: "FE 24-70mm f/2.8 GM", quantity: 1, price: 22800000 }
    ],
    total: 67800000,
    time: "10:15",
    status: "completed" as const,
    image: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?w=400"
  },
  {
    id: "ORD003",
    customer: "Budi Santoso", 
    items: [
      { name: "Nikon Z 7II", quantity: 1, price: 42000000 },
      { name: "NIKKOR Z 24-70mm f/2.8 S", quantity: 1, price: 31200000 }
    ],
    total: 73200000,
    time: "11:00",
    status: "pending" as const,
    image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=400"
  }
];

export const ResponsiveCurrentOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const isMobile = useIsMobile();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Current Orders</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">Recent transactions and active orders</p>
        </div>
        <Button 
          variant="outline" 
          size={isMobile ? "sm" : "default"}
          className="w-full sm:w-auto hover:scale-105 transition-transform"
        >
          View All Orders
        </Button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {mockOrders.map((order) => (
          <div
            key={order.id}
            onClick={() => setSelectedOrder(order)}
            className={cn(
              "border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-600",
              isMobile ? "p-3" : "p-4"
            )}
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Order Image */}
              <img 
                src={order.image} 
                alt="Product" 
                className={cn(
                  "object-cover rounded-lg flex-shrink-0",
                  isMobile ? "w-12 h-12" : "w-16 h-16"
                )}
              />
              
              {/* Order Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className={cn(
                      "font-medium text-gray-900 dark:text-white truncate",
                      isMobile ? "text-sm" : "text-base"
                    )}>
                      {order.customer}
                    </h3>
                    <p className={cn(
                      "text-gray-600 dark:text-gray-400 truncate",
                      isMobile ? "text-xs" : "text-sm"
                    )}>
                      {order.items.length} item{order.items.length > 1 ? 's' : ''} • {order.id}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:items-end gap-1">
                    <span className={cn(
                      "font-semibold text-gray-900 dark:text-white",
                      isMobile ? "text-sm" : "text-base"
                    )}>
                      {formatCurrency(order.total)}
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge className={cn(
                        getStatusColor(order.status),
                        isMobile ? "text-xs px-2 py-0.5" : "text-xs"
                      )}>
                        {order.status}
                      </Badge>
                      {!isMobile && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {order.time}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </Card>
  );
};
