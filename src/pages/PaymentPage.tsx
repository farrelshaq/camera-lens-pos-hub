
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  CreditCard, 
  Smartphone, 
  QrCode, 
  Truck, 
  ArrowLeft,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const orderData = location.state?.orderData || {
    items: [],
    total: 0,
    customerName: "Anonymous Customer"
  };

  const paymentMethods = [
    {
      id: "transfer",
      name: "Bank Transfer",
      icon: CreditCard,
      description: "Transfer to our bank account",
      details: "BCA: 1234567890 (CamPOS Store)"
    },
    {
      id: "ewallet",
      name: "E-Wallet",
      icon: Smartphone,
      description: "OVO, GoPay, DANA, ShopeePay",
      details: "Scan QR code to pay"
    },
    {
      id: "qr",
      name: "QR Code Payment",
      icon: QrCode,
      description: "Scan with any QR payment app",
      details: "Universal QR code payment"
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: Truck,
      description: "Pay when item is delivered",
      details: "Available for local delivery only"
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Confirmed!",
        description: `Order has been processed successfully via ${paymentMethods.find(m => m.id === selectedMethod)?.name}.`,
      });
      navigate("/", { replace: true });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Button variant="outline" onClick={() => navigate(-1)} className="mr-4">
                <ArrowLeft size={20} className="mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Payment Method</h1>
                <p className="text-gray-600">Choose your preferred payment method</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Payment Methods */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedMethod === method.id
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedMethod(method.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            selectedMethod === method.id ? "bg-emerald-500 text-white" : "bg-gray-100"
                          }`}>
                            <method.icon size={20} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{method.name}</h3>
                            <p className="text-sm text-gray-600">{method.description}</p>
                            <p className="text-xs text-gray-500 mt-1">{method.details}</p>
                          </div>
                          {selectedMethod === method.id && (
                            <CheckCircle className="text-emerald-500" size={20} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedMethod && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">Payment Instructions</h3>
                      {selectedMethod === "transfer" && (
                        <div className="text-sm text-blue-700">
                          <p>1. Transfer to BCA: 1234567890</p>
                          <p>2. Use order ID as reference</p>
                          <p>3. Upload payment proof</p>
                        </div>
                      )}
                      {selectedMethod === "ewallet" && (
                        <div className="text-sm text-blue-700">
                          <p>1. Open your e-wallet app</p>
                          <p>2. Scan the QR code displayed</p>
                          <p>3. Confirm payment</p>
                        </div>
                      )}
                      {selectedMethod === "qr" && (
                        <div className="text-sm text-blue-700">
                          <p>1. Open any QR payment app</p>
                          <p>2. Scan the universal QR code</p>
                          <p>3. Complete payment</p>
                        </div>
                      )}
                      {selectedMethod === "cod" && (
                        <div className="text-sm text-blue-700">
                          <p>1. Items will be delivered to your address</p>
                          <p>2. Pay in cash to delivery person</p>
                          <p>3. Get your receipt and items</p>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    {orderData.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                      </div>
                    ))}
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>Rp {orderData.total.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Input
                      placeholder="Customer Name"
                      className="mb-4"
                      defaultValue={orderData.customerName}
                    />
                    <Button
                      onClick={handlePayment}
                      disabled={!selectedMethod || isProcessing}
                      className="w-full bg-emerald-500 hover:bg-emerald-600"
                    >
                      {isProcessing ? "Processing..." : "Confirm Payment"}
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentPage;
