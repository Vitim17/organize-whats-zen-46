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
    default: "bg-gradient-card border-border",
    primary: "bg-gradient-primary text-primary-foreground",
    success: "bg-gradient-success text-success-foreground"
  };

  return (
    <Card className={cn(
      "card-hover shadow-card",
      variantStyles[variant],
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 opacity-70" />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};