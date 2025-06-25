
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Mail, MessageCircle, Printer, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InvoicePage = () => {
  const [invoiceData] = useState({
    invoiceNumber: "INV-2024-001",
    date: new Date().toLocaleDateString('id-ID'),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID'),
    plan: "Premium Plan",
    amount: 99000,
    currency: "IDR",
    paymentMethod: "QRIS",
    status: "Paid"
  });
  
  const { toast } = useToast();

  const handlePrint = () => {
    window.print();
    toast({
      title: "Invoice Printed",
      description: "Invoice has been sent to printer.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Invoice Downloaded",
      description: "Invoice PDF has been downloaded.",
    });
  };

  const handleEmailSend = () => {
    toast({
      title: "Invoice Sent",
      description: "Invoice has been sent via email.",
    });
  };

  const handleWhatsAppSend = () => {
    const message = `Invoice ${invoiceData.invoiceNumber} for ${invoiceData.plan} - ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(invoiceData.amount)}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "WhatsApp Opened",
      description: "Invoice details ready to share via WhatsApp.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Invoice</h1>
            <p className="text-gray-600">Subscription Payment Receipt</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handlePrint} variant="outline">
              <Printer size={16} className="mr-2" />
              Print
            </Button>
            <Button onClick={handleDownload} variant="outline">
              <Download size={16} className="mr-2" />
              Download
            </Button>
            <Button onClick={handleEmailSend} variant="outline">
              <Mail size={16} className="mr-2" />
              Email
            </Button>
            <Button onClick={handleWhatsAppSend} className="bg-green-600 hover:bg-green-700">
              <MessageCircle size={16} className="mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>

        <Card className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded-sm"></div>
                </div>
                <span className="font-bold text-2xl text-gray-800">CamPOS</span>
              </div>
              <p className="text-gray-600">Professional Camera Store Management</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="text-green-500" size={20} />
                <span className="text-green-600 font-medium">PAID</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">INVOICE</p>
              <p className="text-gray-600">{invoiceData.invoiceNumber}</p>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Bill To:</h3>
              <div className="text-gray-600">
                <p>Camera Store Pro</p>
                <p>Jl. Sudirman No. 123</p>
                <p>Jakarta, Indonesia</p>
                <p>admin@camerapro.com</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Invoice Details:</h3>
              <div className="text-gray-600 space-y-1">
                <p><span className="font-medium">Invoice Date:</span> {invoiceData.date}</p>
                <p><span className="font-medium">Due Date:</span> {invoiceData.dueDate}</p>
                <p><span className="font-medium">Payment Method:</span> {invoiceData.paymentMethod}</p>
                <p><span className="font-medium">Status:</span> {invoiceData.status}</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Items */}
          <div className="mb-8">
            <div className="grid grid-cols-4 gap-4 py-3 border-b font-medium text-gray-800">
              <div>Description</div>
              <div className="text-center">Quantity</div>
              <div className="text-center">Rate</div>
              <div className="text-right">Amount</div>
            </div>
            <div className="grid grid-cols-4 gap-4 py-4">
              <div>
                <p className="font-medium">{invoiceData.plan}</p>
                <p className="text-sm text-gray-600">Monthly subscription</p>
              </div>
              <div className="text-center">1</div>
              <div className="text-center">
                {new Intl.NumberFormat('id-ID', { 
                  style: 'currency', 
                  currency: invoiceData.currency 
                }).format(invoiceData.amount)}
              </div>
              <div className="text-right font-medium">
                {new Intl.NumberFormat('id-ID', { 
                  style: 'currency', 
                  currency: invoiceData.currency 
                }).format(invoiceData.amount)}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Total */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{new Intl.NumberFormat('id-ID', { 
                  style: 'currency', 
                  currency: invoiceData.currency 
                }).format(invoiceData.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (11%):</span>
                <span>{new Intl.NumberFormat('id-ID', { 
                  style: 'currency', 
                  currency: invoiceData.currency 
                }).format(invoiceData.amount * 0.11)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{new Intl.NumberFormat('id-ID', { 
                  style: 'currency', 
                  currency: invoiceData.currency 
                }).format(invoiceData.amount * 1.11)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t text-center text-gray-600">
            <p>Thank you for your business!</p>
            <p className="text-sm mt-2">
              For any questions regarding this invoice, please contact us at support@campos.com
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InvoicePage;
