import { CreditCard, AlertTriangle, TrendingUp, TrendingDown, Calendar, Receipt } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CreditCard {
  id: number;
  name: string;
  totalLimit: number;
  usedLimit: number;
  dueDate: Date;
  status: "ativo" | "bloqueado" | "vencido";
  bank: string;
  lastDigits: string;
  color: string;
}

interface CreditPurchase {
  id: number;
  description: string;
  amount: number;
  date: Date;
  category: string;
  cardId: number;
}

export const CartaoCreditoCard = () => {
  const cards: CreditCard[] = [
    {
      id: 1,
      name: "Nubank",
      totalLimit: 5000,
      usedLimit: 2850,
      dueDate: addDays(new Date(), 15),
      status: "ativo",
      bank: "Nubank",
      lastDigits: "1234",
      color: "bg-purple-500"
    },
    {
      id: 2,
      name: "Itaú",
      totalLimit: 8000,
      usedLimit: 3200,
      dueDate: addDays(new Date(), 8),
      status: "ativo",
      bank: "Itaú",
      lastDigits: "5678",
      color: "bg-red-500"
    }
  ];

  const purchases: CreditPurchase[] = [
    {
      id: 1,
      description: "Supermercado Extra",
      amount: 234.50,
      date: new Date(),
      category: "Alimentação",
      cardId: 1
    },
    {
      id: 2,
      description: "Posto Shell",
      amount: 150.00,
      date: addDays(new Date(), -1),
      category: "Transporte",
      cardId: 1
    },
    {
      id: 3,
      description: "Shopping Center",
      amount: 450.00,
      date: addDays(new Date(), -2),
      category: "Lazer",
      cardId: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo": return "bg-green-500";
      case "bloqueado": return "bg-red-500";
      case "vencido": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ativo": return "Ativo";
      case "bloqueado": return "Bloqueado";
      case "vencido": return "Vencido";
      default: return "Desconhecido";
    }
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDueDateColor = (days: number) => {
    if (days <= 0) return "text-red-600";
    if (days <= 7) return "text-yellow-600";
    return "text-green-600";
  };

  const totalLimit = cards.reduce((sum, card) => sum + card.totalLimit, 0);
  const totalUsed = cards.reduce((sum, card) => sum + card.usedLimit, 0);
  const totalAvailable = totalLimit - totalUsed;
  const overallUsage = totalLimit > 0 ? (totalUsed / totalLimit) * 100 : 0;

  return (
    <DashboardCard title="Cartões de Crédito" icon={CreditCard}>
      <div className="space-y-4">
        {/* Resumo Geral */}
        <div className="bg-muted/20 dark:bg-[#3c3c3c] rounded-lg p-3 border dark:border-slate-600/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium dark:text-slate-200">Uso Geral dos Cartões</span>
            <Badge variant="secondary" className="text-xs">
              {overallUsage.toFixed(1)}%
            </Badge>
          </div>
          <Progress value={overallUsage} className="h-2 mb-2" />
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div>
              <div className="font-bold text-primary dark:text-blue-400">R$ {totalLimit.toLocaleString()}</div>
              <div className="text-muted-foreground dark:text-slate-300">Limite Total</div>
            </div>
            <div>
              <div className="font-bold text-destructive dark:text-red-400">R$ {totalUsed.toLocaleString()}</div>
              <div className="text-muted-foreground dark:text-slate-300">Utilizado</div>
            </div>
            <div>
              <div className="font-bold text-success dark:text-green-400">R$ {totalAvailable.toLocaleString()}</div>
              <div className="text-muted-foreground dark:text-slate-300">Disponível</div>
            </div>
          </div>
        </div>

        {/* Lista de Cartões */}
        <div className="space-y-3">
          {cards.map((card) => {
            const usagePercentage = (card.usedLimit / card.totalLimit) * 100;
            const daysUntilDue = getDaysUntilDue(card.dueDate);
            const availableLimit = card.totalLimit - card.usedLimit;

            return (
              <div key={card.id} className="space-y-3 p-3 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-[#3c3c3c]">
                {/* Header do Cartão */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${card.color}`} />
                    <div>
                      <div className="text-sm font-medium dark:text-slate-200">{card.name}</div>
                      <div className="text-xs text-muted-foreground dark:text-slate-400">
                        {card.bank} • ****{card.lastDigits}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`text-xs ${getStatusColor(card.status)} text-white`}>
                      {getStatusLabel(card.status)}
                    </Badge>
                  </div>
                </div>

                {/* Limite e Uso */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground dark:text-slate-400">Uso do Limite</span>
                    <span className="font-medium dark:text-slate-200">{usagePercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={usagePercentage} className="h-2" />
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground dark:text-slate-400">
                      R$ {card.usedLimit.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground dark:text-slate-400">
                      R$ {card.totalLimit.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Informações Adicionais */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className={getDueDateColor(daysUntilDue)}>
                      {daysUntilDue > 0 ? `Vence em ${daysUntilDue} dias` : "Vencido"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground dark:text-slate-400">
                      R$ {availableLimit.toLocaleString()} disponível
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compras Recentes */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium dark:text-slate-200">Compras Recentes</span>
          </div>
          
          <div className="space-y-2">
            {purchases.slice(0, 3).map((purchase) => (
              <div key={purchase.id} className="flex items-center justify-between p-2 bg-muted/30 dark:bg-[#3c3c3c] rounded-lg border dark:border-slate-600/50">
                <div className="flex items-center space-x-2">
                  <Receipt className="h-3 w-3 text-destructive dark:text-red-400" />
                  <div>
                    <div className="text-sm font-medium dark:text-slate-200">{purchase.description}</div>
                    <div className="text-xs text-muted-foreground dark:text-slate-400">
                      {format(purchase.date, "dd/MM", { locale: ptBR })} • {purchase.category}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-bold text-destructive dark:text-red-400">
                  -R$ {purchase.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumo */}
        <div className="bg-muted/30 dark:bg-[#3c3c3c] rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium dark:text-slate-200">Resumo dos Cartões</span>
            <Badge variant="secondary" className="text-xs">
              {cards.length} Cartões
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {cards.filter(c => c.status === "ativo").length}
              </div>
              <div className="text-xs text-muted-foreground dark:text-slate-300">Ativos</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {purchases.length}
              </div>
              <div className="text-xs text-muted-foreground dark:text-slate-300">Compras</div>
            </div>
          </div>
        </div>

        {/* Dica */}
        <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-[#3c3c3c] p-2 rounded-lg dark:border dark:border-blue-500/30">
          💡 Gerencie seus cartões de crédito diretamente pelo WhatsApp
        </div>
      </div>
    </DashboardCard>
  );
};
