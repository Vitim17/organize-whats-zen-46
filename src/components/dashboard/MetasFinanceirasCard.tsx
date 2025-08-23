import { Flag, Target, Calendar, TrendingUp, CheckCircle } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { format, addMonths, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";

interface FinancialGoal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  priority: "baixa" | "média" | "alta";
  category: string;
  icon: string;
  color: string;
}

export const MetasFinanceirasCard = () => {
  const goals: FinancialGoal[] = [
    {
      id: 1,
      name: "Viagem para Europa",
      targetAmount: 15000,
      currentAmount: 8500,
      deadline: addMonths(new Date(), 8),
      priority: "alta",
      category: "Viagem",
      icon: "✈️",
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "Entrada da Casa",
      targetAmount: 50000,
      currentAmount: 25000,
      deadline: addMonths(new Date(), 24),
      priority: "alta",
      category: "Imóvel",
      icon: "🏠",
      color: "bg-green-500"
    },
    {
      id: 3,
      name: "Fundo de Emergência",
      targetAmount: 10000,
      currentAmount: 7000,
      deadline: addMonths(new Date(), 6),
      priority: "média",
      category: "Segurança",
      icon: "🛡️",
      color: "bg-yellow-500"
    },
    {
      id: 4,
      name: "Novo Notebook",
      targetAmount: 3500,
      currentAmount: 2100,
      deadline: addMonths(new Date(), 4),
      priority: "baixa",
      category: "Tecnologia",
      icon: "💻",
      color: "bg-purple-500"
    }
  ];

  const priorityColors = {
    alta: "bg-red-500",
    média: "bg-yellow-500",
    baixa: "bg-green-500"
  };

  const priorityLabels = {
    alta: "Alta",
    média: "Média",
    baixa: "Baixa"
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (deadline: Date) => {
    const days = differenceInDays(deadline, new Date());
    return days > 0 ? days : 0;
  };

  const getStatusColor = (days: number) => {
    if (days <= 30) return "text-red-600";
    if (days <= 90) return "text-yellow-600";
    return "text-green-600";
  };

  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.currentAmount >= goal.targetAmount).length;
  const activeGoals = totalGoals - completedGoals;

  return (
    <DashboardCard title="Metas Financeiras" icon={Flag}>
      <div className="space-y-4">
        {/* Lista de Metas */}
        <div className="space-y-3">
          {goals.map((goal) => {
            const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount);
            const daysRemaining = getDaysRemaining(goal.deadline);
            const isCompleted = goal.currentAmount >= goal.targetAmount;

            return (
              <div key={goal.id} className="space-y-3 p-3 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-[#3c3c3c]">
                {/* Header da Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{goal.icon}</span>
                    <div>
                      <div className="text-sm font-medium dark:text-slate-200">{goal.name}</div>
                      <div className="text-xs text-muted-foreground dark:text-slate-400">
                        {goal.category} • {format(goal.deadline, "MMM yyyy", { locale: ptBR })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`text-xs ${priorityColors[goal.priority]} text-white`}>
                      {priorityLabels[goal.priority]}
                    </Badge>
                    {isCompleted && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                </div>

                {/* Progresso */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground dark:text-slate-400">Progresso</span>
                    <span className="font-medium dark:text-slate-200">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground dark:text-slate-400">
                      R$ {goal.currentAmount.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground dark:text-slate-400">
                      R$ {goal.targetAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Status e Prazo */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className={getStatusColor(daysRemaining)}>
                      {daysRemaining > 0 ? `${daysRemaining} dias restantes` : "Prazo vencido"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground dark:text-slate-400">
                      R$ {(goal.targetAmount - goal.currentAmount).toLocaleString()} restam
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumo */}
        <div className="bg-muted/30 dark:bg-[#3c3c3c] rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium dark:text-slate-200">Resumo das Metas</span>
            <Badge variant="secondary" className="text-xs">
              {totalGoals} Total
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-green-600 dark:text-green-400">{completedGoals}</div>
              <div className="text-xs text-muted-foreground dark:text-slate-300">Concluídas</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{activeGoals}</div>
              <div className="text-xs text-muted-foreground dark:text-slate-300">Ativas</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {goals.filter(g => g.priority === "alta").length}
              </div>
              <div className="text-xs text-muted-foreground dark:text-slate-300">Alta Prioridade</div>
            </div>
          </div>
        </div>

        {/* Dica */}
        <div className="text-xs text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-[#3c3c3c] p-2 rounded-lg dark:border dark:border-purple-500/30">
          💡 Gerencie suas metas financeiras diretamente pelo WhatsApp
        </div>
      </div>
    </DashboardCard>
  );
};
