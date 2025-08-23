import { CreditCard, DollarSign } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { Badge } from "@/components/ui/badge";

export const ConectividadeCard = () => {
  const cardData = {
    limite: 5000,
    usado: 2850,
    disponivel: 2150,
    vencimento: "15/12/2024",
    compras: [
      { descricao: "Supermercado Extra", valor: 234.50, data: "Hoje" },
      { descricao: "Posto Shell", valor: 150.00, data: "Ontem" },
      { descricao: "iFood", valor: 45.80, data: "2 dias" },
      { descricao: "Netflix", valor: 29.90, data: "3 dias" }
    ]
  };

  const percentualUsado = (cardData.usado / cardData.limite) * 100;

  return (
    <DashboardCard title="Cartão de Crédito" icon={CreditCard}>
      <div className="space-y-4">
        {/* Status do Cartão */}
        <div className="bg-gradient-primary dark:bg-[#3a6604] rounded-lg p-4 text-primary-foreground dark:text-white border dark:border-green-500/50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-primary-foreground/95 dark:text-[#3c3c3c] drop-shadow-md font-medium">Limite Total</span>
            <Badge variant="secondary" className="bg-white/30 text-white dark:bg-white/20 dark:text-[#3c3c3c] font-semibold drop-shadow-sm">
              Ativo
            </Badge>
          </div>
          <div className="text-2xl font-bold text-primary-foreground dark:text-[#3c3c3c] drop-shadow-lg">R$ {cardData.limite.toLocaleString()}</div>
          <div className="text-sm text-primary-foreground/90 dark:text-[#3c3c3c] drop-shadow-md">Vencimento: {cardData.vencimento}</div>
        </div>

        {/* Resumo do Limite */}
        <div className="bg-muted/20 dark:bg-[#3c3c3c] rounded-lg p-3 border dark:border-slate-600/50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium dark:text-slate-200">Limite Usado</span>
            <span className="text-lg font-bold text-primary dark:text-blue-400">{percentualUsado.toFixed(1)}%</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-sm font-bold text-destructive dark:text-red-400">R$ {cardData.usado.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground dark:text-slate-300">Usado</div>
            </div>
            <div>
              <div className="text-sm font-bold text-success dark:text-green-400">R$ {cardData.disponivel.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground dark:text-slate-300">Disponível</div>
            </div>
          </div>
        </div>

        {/* Compras Recentes */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium dark:text-slate-200">Compras Recentes</span>
          </div>
          
          <div className="space-y-2">
            {cardData.compras.slice(0, 2).map((compra, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/30 dark:bg-[#3c3c3c] rounded-lg border dark:border-slate-600/50">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-3 w-3 text-destructive dark:text-red-400" />
                  <div>
                    <div className="text-sm font-medium dark:text-slate-200">{compra.descricao}</div>
                    <div className="text-xs text-muted-foreground dark:text-slate-400">{compra.data}</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-destructive dark:text-red-400">
                  -R$ {compra.valor.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-muted/30 dark:bg-[#3c3c3c] rounded p-2 border dark:border-slate-600/50">
            <div className="text-sm font-bold text-primary dark:text-blue-400">{cardData.compras.length}</div>
            <div className="text-xs text-muted-foreground dark:text-slate-300">Compras</div>
          </div>
          <div className="bg-muted/30 dark:bg-[#3c3c3c] rounded p-2 border dark:border-slate-600/50">
            <div className="text-sm font-bold text-destructive dark:text-red-400">R$ {cardData.usado}</div>
            <div className="text-xs text-muted-foreground dark:text-slate-300">Gasto Mensal</div>
          </div>
        </div>

        {/* Dica */}
        <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-[#3c3c3c] p-2 rounded-lg dark:border dark:border-blue-500/30">
          💡 Gerencie seu cartão diretamente pelo WhatsApp
        </div>
      </div>
    </DashboardCard>
  );
};