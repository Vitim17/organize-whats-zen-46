import { TrendingUp, TrendingDown, Lightbulb } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const InteligenciaCard = () => {
  const [showInsights, setShowInsights] = useState(false);
  
  const saldoAtual = 2450;
  const entradas = 4300;
  const saidas = 1850;

  const insights = [
    "💡 Seus gastos com alimentação aumentaram 8% este mês",
    "📈 Economia de R$ 180 comparado ao mês anterior",
    "🎯 Meta de economia está 75% concluída",
    "⚠️ Categoria 'Lazer' próxima do limite mensal"
  ];

  return (
    <DashboardCard 
      title="Inteligência Financeira" 
      icon={Lightbulb}
    >
      <div className="space-y-4">
        {/* Resumo dos Valores */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-primary/10 rounded-lg p-3">
            <div className="text-lg font-bold text-primary">R$ {saldoAtual}</div>
            <div className="text-xs text-muted-foreground">Saldo</div>
          </div>
          <div className="bg-success/10 rounded-lg p-3">
            <div className="text-lg font-bold text-success">R$ {entradas}</div>
            <div className="text-xs text-muted-foreground">Entradas</div>
          </div>
          <div className="bg-destructive/10 rounded-lg p-3">
            <div className="text-lg font-bold text-destructive">R$ {saidas}</div>
            <div className="text-xs text-muted-foreground">Saídas</div>
          </div>
        </div>

        {/* Comparação com mês anterior */}
        <div className="bg-muted/20 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Comparação com mês anterior</span>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm text-success">+R$ 180</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Você economizou R$ 180 comparado ao mês passado
          </div>
        </div>

        {/* Insights da Semana */}
        <div className="bg-primary/10 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Insights da Semana</span>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => setShowInsights(!showInsights)}
            >
              {showInsights ? "Ocultar" : "Ver mais"}
            </Button>
          </div>
          
          <div className="space-y-2">
            {insights.slice(0, showInsights ? insights.length : 2).map((insight, index) => (
              <div key={index} className="text-xs text-muted-foreground">
                {insight}
              </div>
            ))}
          </div>
        </div>

        {/* Meta de economia */}
        <div className="bg-success/10 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Meta de Economia</div>
              <div className="text-xs text-muted-foreground">75% concluída</div>
            </div>
            <div className="text-lg font-bold text-success">75%</div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};