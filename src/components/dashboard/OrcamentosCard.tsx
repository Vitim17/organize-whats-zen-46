import { Target, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface BudgetCategory {
  id: number;
  name: string;
  totalBudget: number;
  spentAmount: number;
  color: string;
  icon: string;
}

export const OrcamentosCard = () => {
  const budgets: BudgetCategory[] = [
    {
      id: 1,
      name: "Alimentação",
      totalBudget: 500,
      spentAmount: 234.50,
      color: "bg-green-500",
      icon: "🍽️"
    },
    {
      id: 2,
      name: "Transporte",
      totalBudget: 300,
      spentAmount: 150,
      color: "bg-blue-500",
      icon: "🚗"
    },
    {
      id: 3,
      name: "Lazer",
      totalBudget: 200,
      spentAmount: 180,
      color: "bg-purple-500",
      icon: "🎮"
    },
    {
      id: 4,
      name: "Saúde",
      totalBudget: 150,
      spentAmount: 45,
      color: "bg-red-500",
      icon: "🏥"
    }
  ];

  const getBudgetStatus = (budget: BudgetCategory) => {
    const percentage = (budget.spentAmount / budget.totalBudget) * 100;
    if (percentage >= 90) return "danger";
    if (percentage >= 75) return "warning";
    if (percentage >= 50) return "info";
    return "safe";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "danger": return "text-red-600";
      case "warning": return "text-yellow-600";
      case "info": return "text-blue-600";
      default: return "text-green-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "danger": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "warning": return <TrendingUp className="h-4 w-4 text-yellow-600" />;
      case "info": return <TrendingDown className="h-4 w-4 text-blue-600" />;
      default: return <Target className="h-4 w-4 text-green-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "danger": return "Crítico";
      case "warning": return "Atenção";
      case "info": return "Moderado";
      default: return "Saudável";
    }
  };

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.totalBudget, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spentAmount, 0);
  const totalRemaining = totalBudget - totalSpent;
  const overallProgress = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <DashboardCard title="Orçamentos Mensais" icon={Target}>
      <div className="space-y-4">
        {/* Progresso Geral */}
        <div className="bg-muted/20 dark:bg-[#3c3c3c] rounded-lg p-3 border dark:border-slate-600/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium dark:text-slate-200">Orçamento Geral</span>
            <Badge variant="secondary" className="text-xs">
              {overallProgress.toFixed(1)}%
            </Badge>
          </div>
          <Progress value={overallProgress} className="h-2 mb-2" />
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div>
              <div className="font-bold text-primary dark:text-blue-400">R$ {totalBudget.toLocaleString()}</div>
              <div className="text-muted-foreground dark:text-slate-300">Total</div>
            </div>
            <div>
              <div className="font-bold text-destructive dark:text-red-400">R$ {totalSpent.toLocaleString()}</div>
              <div className="text-muted-foreground dark:text-slate-300">Gasto</div>
            </div>
            <div>
              <div className="font-bold text-success dark:text-green-400">R$ {totalRemaining.toLocaleString()}</div>
              <div className="text-muted-foreground dark:text-slate-300">Restante</div>
            </div>
          </div>
        </div>

        {/* Lista de Orçamentos */}
        <div className="space-y-3">
          {budgets.map((budget) => {
            const percentage = (budget.spentAmount / budget.totalBudget) * 100;
            const status = getBudgetStatus(budget);
            const remaining = budget.totalBudget - budget.spentAmount;

            return (
              <div key={budget.id} className="space-y-3 p-3 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-[#3c3c3c]">
                {/* Header do Orçamento */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{budget.icon}</span>
                    <div>
                      <div className="text-sm font-medium dark:text-slate-200">{budget.name}</div>
                      <div className="text-xs text-muted-foreground dark:text-slate-400">
                        Orçamento mensal
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(status)}
                    <Badge className={`text-xs ${getStatusColor(status)} bg-opacity-20`}>
                      {getStatusLabel(status)}
                    </Badge>
                  </div>
                </div>

                {/* Barra de Progresso */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground dark:text-slate-400">Progresso</span>
                    <span className="font-medium dark:text-slate-200">{percentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground dark:text-slate-400">
                      R$ {budget.spentAmount.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground dark:text-slate-400">
                      R$ {budget.totalBudget.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Status e Valores */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground dark:text-slate-400">
                      R$ {remaining.toLocaleString()} restam
                    </span>
                  </div>
                  <div className="text-muted-foreground dark:text-slate-400">
                    {percentage >= 100 ? "Orçamento esgotado" : `${(100 - percentage).toFixed(1)}% disponível`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumo */}
        <div className="bg-muted/30 dark:bg-[#3c3c3c] rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium dark:text-slate-200">Resumo dos Orçamentos</span>
            <Badge variant="secondary" className="text-xs">
              {budgets.length} Categorias
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {budgets.filter(b => getBudgetStatus(b) === "safe").length}
              </div>
              <div className="text-xs text-muted-foreground dark:text-slate-300">Saudáveis</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                {budgets.filter(b => ["warning", "danger"].includes(getBudgetStatus(b))).length}
              </div>
              <div className="text-xs text-muted-foreground dark:text-slate-300">Atenção</div>
            </div>
          </div>
        </div>

        {/* Dica */}
        <div className="text-xs text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-[#3c3c3c] p-2 rounded-lg dark:border dark:border-orange-500/30">
          💡 Gerencie seus orçamentos diretamente pelo WhatsApp
        </div>
      </div>
    </DashboardCard>
  );
};
