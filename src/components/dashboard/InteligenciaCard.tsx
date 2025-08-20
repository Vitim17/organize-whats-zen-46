import { PieChart, FileText, Filter, TrendingUp, TrendingDown } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";

export const InteligenciaCard = () => {
  const [showInsights, setShowInsights] = useState(false);
  
  const saldoAtual = 2450;
  const entradas = 4300;
  const saidas = 1850;

  const data = [
    { name: 'Saldo Atual', value: saldoAtual, color: '#3B82F6' },
    { name: 'Entradas', value: entradas, color: '#10B981' },
    { name: 'Saídas', value: saidas, color: '#EF4444' }
  ];

  const insights = [
    "💡 Seus gastos com alimentação aumentaram 8% este mês",
    "📈 Economia de R$ 180 comparado ao mês anterior",
    "🎯 Meta de economia está 75% concluída",
    "⚠️ Categoria 'Lazer' próxima do limite mensal"
  ];

  return (
    <DashboardCard title="Inteligência Financeira" icon={PieChart}>
      <div className="space-y-4">
        {/* Gráfico Circular */}
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`R$ ${value.toLocaleString()}`, '']}
                labelFormatter={(label) => label}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        {/* Resumo dos Valores */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-primary/10 rounded p-2">
            <div className="text-sm font-bold text-primary">R$ {saldoAtual}</div>
            <div className="text-xs text-muted-foreground">Saldo</div>
          </div>
          <div className="bg-success/10 rounded p-2">
            <div className="text-sm font-bold text-success">R$ {entradas}</div>
            <div className="text-xs text-muted-foreground">Entradas</div>
          </div>
          <div className="bg-destructive/10 rounded p-2">
            <div className="text-sm font-bold text-destructive">R$ {saidas}</div>
            <div className="text-xs text-muted-foreground">Saídas</div>
          </div>
        </div>

        {/* Insights da Semana */}
        <div className="bg-primary/10 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-primary">💡 Insights dos Gastos</div>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setShowInsights(!showInsights)}
              className="h-6 px-2"
            >
              {showInsights ? "Menos" : "Mais"}
            </Button>
          </div>
          <div className="space-y-1">
            {insights.slice(0, showInsights ? 4 : 1).map((insight, index) => (
              <div key={index} className="text-xs text-muted-foreground">
                {insight}
              </div>
            ))}
          </div>
        </div>

        {/* Comparativo do Mês */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-success/10 rounded p-2 text-center">
            <TrendingUp className="h-4 w-4 text-success mx-auto mb-1" />
            <div className="text-sm font-bold text-success">+15%</div>
            <div className="text-xs text-muted-foreground">vs Mês Anterior</div>
          </div>
          <div className="bg-primary/10 rounded p-2 text-center">
            <TrendingDown className="h-4 w-4 text-primary mx-auto mb-1" />
            <div className="text-sm font-bold text-primary">-8%</div>
            <div className="text-xs text-muted-foreground">Gastos Extras</div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1">
            <FileText className="h-3 w-3 mr-1" />
            Relatório
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Filter className="h-3 w-3 mr-1" />
            Filtros
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};