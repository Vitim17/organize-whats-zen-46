import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
  variant?: "default" | "primary" | "success";
}

export const DashboardCard = ({ 
  title, 
  icon: Icon, 
  children, 
  className,
  variant = "default"
}: DashboardCardProps) => {
  const variantStyles = {
                    default: "bg-gradient-card border-border dark:bg-slate-800/95 dark:border-slate-600 dark:shadow-2xl",
    primary: "bg-gradient-primary text-primary-foreground dark:bg-blue-500/90 dark:text-white",
    success: "bg-gradient-success text-success-foreground dark:bg-green-500/90 dark:text-white"
  };

  return (
    <Card className={cn(
      "card-hover shadow-card transition-all duration-300",
                        "dark:hover:bg-slate-700/80 dark:hover:shadow-2xl dark:hover:border-slate-500",
      variantStyles[variant],
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium dark:text-slate-100">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 opacity-70 dark:opacity-90 dark:text-slate-300" />
      </CardHeader>
      <CardContent className="dark:text-slate-100">
        {children}
      </CardContent>
    </Card>
  );
};