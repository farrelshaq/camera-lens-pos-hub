
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
}

export const ResponsiveContainer = ({ children, className }: ResponsiveContainerProps) => {
  return (
    <div className={cn(
      "container-responsive px-4 sm:px-6 lg:px-8 mx-auto",
      className
    )}>
      {children}
    </div>
  );
};

export const ResponsiveGrid = ({ children, className }: ResponsiveContainerProps) => {
  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6",
      className
    )}>
      {children}
    </div>
  );
};

export const ResponsiveCard = ({ children, className }: ResponsiveContainerProps) => {
  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6",
      className
    )}>
      {children}
    </div>
  );
};
