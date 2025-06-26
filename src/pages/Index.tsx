
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { CurrentOrders } from "@/components/dashboard/CurrentOrders";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 lg:p-6">
          <div className="space-y-4 lg:space-y-6">
            {/* Current Orders */}
            <CurrentOrders />
            
            {/* Business Dashboard Button */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <Button 
                onClick={() => navigate('/dashboard')} 
                className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all hover:scale-105"
              >
                <BarChart3 size={20} className="mr-2" />
                View Business Dashboard
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
