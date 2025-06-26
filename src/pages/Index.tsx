
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import { ResponsiveSidebar } from "@/components/layout/ResponsiveSidebar";
import { ResponsiveHeader } from "@/components/layout/ResponsiveHeader";
import { ResponsiveCurrentOrders } from "@/components/dashboard/ResponsiveCurrentOrders";
import { ResponsiveContainer, ResponsiveCard } from "@/components/ui/responsive-container";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex w-full">
      <ResponsiveSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <ResponsiveHeader />
        <main className={`flex-1 p-4 ${isMobile ? 'pt-16' : 'lg:p-6'}`}>
          <ResponsiveContainer>
            <div className="space-y-4 lg:space-y-6">
              {/* Current Orders */}
              <ResponsiveCurrentOrders />
              
              {/* Business Dashboard Button */}
              <ResponsiveCard>
                <Button 
                  onClick={() => navigate('/dashboard')} 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all hover:scale-105"
                  size={isMobile ? "default" : "lg"}
                >
                  <BarChart3 size={isMobile ? 18 : 20} className="mr-2" />
                  View Business Dashboard
                </Button>
              </ResponsiveCard>
            </div>
          </ResponsiveContainer>
        </main>
      </div>
    </div>
  );
};

export default Index;
