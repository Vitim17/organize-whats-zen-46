import { TrendingUp, Lightbulb } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";

export const InteligenciaCard = () => {
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
          <div className="bg-primary/10 dark:bg-[#3c3c3c] rounded-lg p-3 border dark:border-green-500/30">
            <div className="text-lg font-bold text-primary dark:text-green-400">R$ {saldoAtual}</div>
            <div className="text-xs text-muted-foreground dark:text-slate-300">Saldo</div>
          </div>
          <div className="bg-success/10 dark:bg-[#3c3c3c] rounded-lg p-3 border dark:border-green-500/30">
            <div className="text-lg font-bold text-success dark:text-green-400">R$ {entradas}</div>
            <div className="text-xs text-muted-foreground dark:text-slate-300">Entradas</div>
          </div>
          <div className="bg-destructive/10 dark:bg-[#3c3c3c] rounded-lg p-3 border dark:border-red-500/30">
            <div className="text-lg font-bold text-destructive dark:text-red-400">R$ {saidas}</div>
            <div className="text-xs text-muted-foreground dark:text-slate-300">Saídas</div>
          </div>
        </div>

        {/* Comparação com mês anterior */}
        <div className="bg-muted/20 dark:bg-[#3c3c3c] rounded-lg p-3 border dark:border-slate-600/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium dark:text-slate-200">Comparação com mês anterior</span>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-success dark:text-green-400" />
              <span className="text-sm text-success dark:text-green-400">+R$ 180</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground dark:text-slate-300">
            Você economizou R$ 180 comparado ao mês passado
          </div>
        </div>

        {/* Insights da Semana */}
        <div className="bg-primary/10 dark:bg-[#3c3c3c] rounded-lg p-3 border dark:border-green-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium dark:text-slate-200">Insights da Semana</span>
          </div>
          
          <div className="space-y-2">
            {insights.map((insight, index) => (
              <div key={index} className="text-xs text-muted-foreground dark:text-slate-300">
                {insight}
              </div>
            ))}
          </div>
        </div>

        {/* Meta de economia */}
        <div className="bg-success/10 dark:bg-[#3c3c3c] rounded-lg p-3 border dark:border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium dark:text-slate-200">Meta de Economia</div>
              <div className="text-xs text-muted-foreground dark:text-slate-300">75% concluída</div>
            </div>
            <div className="text-lg font-bold text-success dark:text-green-400">75%</div>
          </div>
        </div>

        {/* Dica */}
        <div className="text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-[#3c3c3c] p-2 rounded-lg dark:border dark:border-yellow-500/30">
          💡 Receba insights personalizados diretamente pelo WhatsApp
        </div>
      </div>
    </DashboardCard>
  );
};