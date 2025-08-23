import { Zap, Settings, Bell, TrendingUp, TrendingDown, Calendar, Target } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { Badge } from "@/components/ui/badge";

interface Automation {
  id: number;
  name: string;
  type: "transfer" | "payment" | "alert" | "goal";
  condition: "balance_above" | "balance_below" | "date_reached" | "category_limit";
  threshold: number;
  action: string;
  isActive: boolean;
  frequency: "once" | "daily" | "weekly" | "monthly";
  description: string;
  icon: string;
  color: string;
  lastExecuted?: Date;
  nextExecution?: Date;
}

export const AutomacoesCard = () => {
  const automations: Automation[] = [
    {
      id: 1,
      name: "Transferência para Poupança",
      type: "transfer",
      condition: "balance_above",
      threshold: 3000,
      action: "Transferir R$ 500 para poupança",
      isActive: true,
      frequency: "monthly",
      description: "Quando saldo > R$ 3.000, transferir R$ 500 automaticamente",
      icon: "💰",
      color: "bg-green-500"
    },
    {
      id: 2,
      name: "Alerta de Limite de Cartão",
      type: "alert",
      condition: "category_limit",
      threshold: 80,
      action: "Notificar quando uso > 80%",
      isActive: true,
      frequency: "daily",
      description: "Alertar quando uso do cartão ultrapassar 80%",
      icon: "⚠️",
      color: "bg-yellow-500"
    },
    {
      id: 3,
      name: "Pagamento de Contas",
      type: "payment",
      condition: "date_reached",
      threshold: 5,
      action: "Pagar contas próximas do vencimento",
      isActive: false,
      frequency: "daily",
      description: "Pagar contas quando faltar 5 dias para vencer",
      icon: "📅",
      color: "bg-blue-500"
    },
    {
      id: 4,
      name: "Contribuição para Meta",
      type: "goal",
      condition: "balance_above",
      threshold: 2000,
      action: "Adicionar R$ 200 para meta 'Viagem'",
      isActive: true,
      frequency: "weekly",
      description: "Contribuir R$ 200 para meta quando saldo > R$ 2.000",
      icon: "🎯",
      color: "bg-purple-500"
    }
  ];

  const getTypeLabel = (type: string) => {
    const labels = {
      transfer: "Transferência",
      payment: "Pagamento",
      alert: "Alerta",
      goal: "Meta"
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getConditionLabel = (condition: string) => {
    const labels = {
      balance_above: "Saldo >",
      balance_below: "Saldo <",
      date_reached: "Data:",
      category_limit: "Limite >"
    };
    return labels[condition as keyof typeof labels] || condition;
  };

  const getFrequencyLabel = (frequency: string) => {
    const labels = {
      once: "Uma vez",
      daily: "Diário",
      weekly: "Semanal",
      monthly: "Mensal"
    };
    return labels[frequency as keyof typeof labels] || frequency;
  };

  const activeAutomations = automations.filter(a => a.isActive);
  const inactiveAutomations = automations.filter(a => !a.isActive);

  return (
    <DashboardCard title="Automações Financeiras" icon={Zap}>
      <div className="space-y-4">
        {/* Lista de automações ativas */}
        {activeAutomations.length > 0 && (
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-600 flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Automações Ativas</span>
            </div>
            
            {activeAutomations.map((automation) => (
              <div key={automation.id} className="space-y-3 p-3 border border-green-200 rounded-lg bg-green-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{automation.icon}</span>
                    <div>
                      <div className="text-sm font-medium">{automation.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {getTypeLabel(automation.type)} • {getFrequencyLabel(automation.frequency)}
                      </div>
                    </div>
                  </div>
                  <Badge className={`text-xs ${automation.color} text-white`}>
                    Ativa
                  </Badge>
                </div>
                
                <div className="text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Condição:</span>
                    <span className="font-medium">
                      {getConditionLabel(automation.condition)} R$ {automation.threshold.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Ação:</span>
                    <span className="font-medium">{automation.action}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {automation.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lista de automações inativas */}
        {inactiveAutomations.length > 0 && (
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-600 flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Automações Inativas</span>
            </div>
            
            {inactiveAutomations.map((automation) => (
              <div key={automation.id} className="space-y-3 p-3 border border-gray-200 rounded-lg bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg opacity-50">{automation.icon}</span>
                    <div>
                      <div className="text-sm font-medium opacity-70">{automation.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {getTypeLabel(automation.type)} • {getFrequencyLabel(automation.frequency)}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs opacity-70">
                    Inativa
                  </Badge>
                </div>
                
                <div className="text-xs space-y-1 opacity-70">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Condição:</span>
                    <span className="font-medium">
                      {getConditionLabel(automation.condition)} R$ {automation.threshold.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Ação:</span>
                    <span className="font-medium">{automation.action}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Resumo e estatísticas */}
        <div className="bg-muted/30 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Resumo das Automações</span>
            <Badge variant="secondary" className="text-xs">
              {automations.length} Total
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">{activeAutomations.length}</div>
              <div className="text-xs text-muted-foreground">Ativas</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-600">{inactiveAutomations.length}</div>
              <div className="text-xs text-muted-foreground">Inativas</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">
                {automations.filter(a => a.type === "transfer").length}
              </div>
              <div className="text-xs text-muted-foreground">Transferências</div>
            </div>
          </div>
        </div>

        {/* Dica de uso */}
        <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-[#3c3c3c] p-2 rounded-lg dark:border dark:border-blue-500/30">
          💡 Gerencie suas automações diretamente pelo WhatsApp
        </div>
      </div>
    </DashboardCard>
  );
};
