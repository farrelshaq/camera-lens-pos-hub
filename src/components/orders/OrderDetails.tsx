
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Receipt,
  CreditCard
} from "lucide-react";

interface OrderDetailsProps {
  orderItems: any[];
  onUpdateItem: (productId: number, quantity: number) => void;
  onClearOrder: () => void;
}

export const OrderDetails = ({ orderItems, onUpdateItem, onClearOrder }: OrderDetailsProps) => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (orderItems.length === 0) return;
    
    navigate('/payment', {
      state: {
        orderData: {
          items: orderItems,
          total: total,
          customerName: customerName || "Anonymous Customer"
        }
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-fit">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <ShoppingCart size={20} className="mr-2" />
            Order Details
          </h2>
          {orderItems.length > 0 && (
            <Badge variant="secondary">{orderItems.length} items</Badge>
          )}
        </div>

        {orderItems.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No items in order</p>
            <p className="text-sm text-gray-400">Add products to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Order Items */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-emerald-600 font-semibold">
                      Rp {item.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateItem(item.id, item.quantity - 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus size={12} />
                    </Button>
                    <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateItem(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus size={12} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateItem(item.id, 0)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Order Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (10%)</span>
                <span>Rp {tax.toLocaleString('id-ID')}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-emerald-600">Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Customer Info */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Customer Name (Optional)</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-4">
              <Button 
                onClick={handleCheckout}
                className="w-full bg-emerald-500 hover:bg-emerald-600 hover:scale-105 transition-all"
              >
                <CreditCard size={16} className="mr-2" />
                Proceed to Payment
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                  <Receipt size={14} className="mr-1" />
                  Print
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onClearOrder}
                  className="hover:scale-105 transition-transform"
                >
                  Clear All
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
