
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Check, Zap, Shield, Users, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const subscriptionPlans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "month",
    description: "Perfect for small shops getting started",
    features: [
      "Up to 50 products",
      "Basic inventory tracking",
      "Simple reports",
      "1 user account",
      "Email support"
    ],
    icon: Shield,
    color: "bg-gray-100 text-gray-800",
    popular: false
  },
  {
    id: "basic",
    name: "Basic",
    price: 99000,
    period: "month",
    description: "Great for growing camera stores",
    features: [
      "Up to 500 products",
      "Advanced inventory management",
      "Detailed analytics",
      "Up to 3 users",
      "Priority support",
      "Barcode scanning",
      "Receipt printing"
    ],
    icon: Zap,
    color: "bg-blue-100 text-blue-800",
    popular: true
  },
  {
    id: "pro",
    name: "Pro",
    price: 199000,
    period: "month",
    description: "Perfect for established camera retailers",
    features: [
      "Unlimited products",
      "Multi-location support",
      "Advanced reporting & analytics",
      "Unlimited users",
      "24/7 premium support",
      "API access",
      "Custom integrations",
      "Trade-in management",
      "Customer CRM"
    ],
    icon: Crown,
    color: "bg-emerald-100 text-emerald-800",
    popular: false
  }
];

export const SubscriptionCard = () => {
  const [currentPlan, setCurrentPlan] = useState("free");
  const { toast } = useToast();

  const handleUpgrade = (planId: string) => {
    toast({
      title: "Upgrade Subscription",
      description: `Upgrading to ${subscriptionPlans.find(p => p.id === planId)?.name} plan...`,
    });
    
    // Here you would integrate with payment gateway
    setTimeout(() => {
      setCurrentPlan(planId);
      toast({
        title: "Subscription Updated!",
        description: "Your subscription has been upgraded successfully.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Plan</h2>
        <p className="text-gray-600">Unlock powerful features for your camera store</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => (
          <Card key={plan.id} className={`relative p-6 ${plan.popular ? 'ring-2 ring-emerald-500' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-500">
                Most Popular
              </Badge>
            )}
            
            <div className="text-center mb-6">
              <div className={`w-12 h-12 rounded-full ${plan.color} flex items-center justify-center mx-auto mb-4`}>
                <plan.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold">Rp {plan.price.toLocaleString('id-ID')}</span>
                <span className="text-gray-600">/{plan.period}</span>
              </div>
              <p className="text-sm text-gray-600">{plan.description}</p>
            </div>

            <div className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check size={16} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => handleUpgrade(plan.id)}
              disabled={currentPlan === plan.id}
              className={`w-full ${
                currentPlan === plan.id 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : plan.popular 
                    ? 'bg-emerald-500 hover:bg-emerald-600' 
                    : 'bg-gray-800 hover:bg-gray-900'
              }`}
            >
              {currentPlan === plan.id ? 'Current Plan' : `Upgrade to ${plan.name}`}
            </Button>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          Need a custom solution? Contact us for enterprise pricing.
        </p>
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Shield size={16} />
            <span>30-day money back</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>24/7 support</span>
          </div>
          <div className="flex items-center space-x-1">
            <BarChart3 size={16} />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
};
