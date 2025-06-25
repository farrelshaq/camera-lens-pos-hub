
import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const OrderDetails = ({ orderItems, onUpdateItem, onClearOrder }) => {
  const [paymentMethod, setPaymentMethod] = useState("dine-in");
  const [customerName, setCustomerName] = useState("Darius Sinarmula");
  const [tableNumber, setTableNumber] = useState("04");

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = 0.05;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order details</h2>
        
        {/* Order Type */}
        <div className="flex space-x-2 mb-4">
          {["Dine-in", "Takeaway", "Delivery"].map((type) => (
            <button
              key={type}
              onClick={() => setPaymentMethod(type.toLowerCase())}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                paymentMethod === type.toLowerCase()
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Table number</label>
            <input
              type="text"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-800">Ordered menu</h3>
          <span className="text-sm text-gray-500">{orderItems.length} Items</span>
        </div>

        <div className="space-y-4 mb-6">
          {orderItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No items in order</p>
          ) : (
            orderItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">${item.price} × {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateItem(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateItem(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus size={12} />
                  </button>
                  <button
                    onClick={() => onUpdateItem(item.id, 0)}
                    className="w-8 h-8 rounded-full bg-red-50 border border-red-200 flex items-center justify-center hover:bg-red-100 text-red-600 ml-2"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <div className="font-semibold text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Payment Details */}
        {orderItems.length > 0 && (
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-medium text-gray-800 mb-4">Payment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes</span>
                <span className="font-medium">5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Additional fee</span>
                <span className="font-medium">-</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-6 border-t border-gray-200">
        <Button 
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-medium"
          disabled={orderItems.length === 0}
        >
          Confirm Order
        </Button>
        {orderItems.length > 0 && (
          <Button 
            variant="outline" 
            className="w-full mt-3 py-3"
            onClick={onClearOrder}
          >
            Clear Order
          </Button>
        )}
      </div>
    </div>
  );
};
