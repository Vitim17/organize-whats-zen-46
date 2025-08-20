import { DollarSign, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";

export const FinanceiroCard = () => {
  const transactions = [
    { id: 1, type: "entrada", description: "Salário", value: 3500, date: "Hoje" },
    { id: 2, type: "saida", description: "Supermercado", value: -150, date: "Ontem" },
    { id: 3, type: "entrada", description: "Freelance", value: 800, date: "2 dias" },
  ];

  return (
    <DashboardCard title="Financeiro" icon={DollarSign}>
      <div className="space-y-4">
        {/* Resumo financeiro */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-success-light/20 rounded-lg p-3 text-center">
            <TrendingUp className="h-4 w-4 text-success mx-auto mb-1" />
            <div className="text-lg font-bold text-success">R$ 4.300</div>
            <div className="text-xs text-muted-foreground">Entradas</div>
          </div>
          <div className="bg-destructive/10 rounded-lg p-3 text-center">
            <TrendingDown className="h-4 w-4 text-destructive mx-auto mb-1" />
            <div className="text-lg font-bold text-destructive">R$ 1.850</div>
            <div className="text-xs text-muted-foreground">Saídas</div>
          </div>
        </div>

        {/* Saldo atual */}
        <div className="bg-gradient-primary rounded-lg p-4 text-primary-foreground text-center">
          <div className="text-sm opacity-90 mb-1">Saldo Atual</div>
          <div className="text-2xl font-bold">R$ 2.450,00</div>
        </div>

        {/* Transações recentes */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">Recentes</div>
            <Button size="sm" variant="outline" className="h-6 px-2">
              <Plus className="h-3 w-3 mr-1" />
              Nova
            </Button>
          </div>
          
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  {transaction.type === "entrada" ? (
                    <TrendingUp className="h-3 w-3 text-success" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-destructive" />
                  )}
                  <div>
                    <div className="text-sm font-medium">{transaction.description}</div>
                    <div className="text-xs text-muted-foreground">{transaction.date}</div>
                  </div>
                </div>
                <div className={`text-sm font-bold ${
                  transaction.type === "entrada" ? "text-success" : "text-destructive"
                }`}>
                  {transaction.type === "entrada" ? "+" : ""}R$ {Math.abs(transaction.value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};