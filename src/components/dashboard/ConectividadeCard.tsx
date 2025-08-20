import { CreditCard, TrendingUp, Calendar, DollarSign } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const ConectividadeCard = () => {
  const [showDetails, setShowDetails] = useState(false);
  
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
        <div className="bg-gradient-primary rounded-lg p-4 text-primary-foreground">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm opacity-90">Limite Total</span>
            <Badge variant="secondary" className="bg-white/20 text-white">
              Ativo
            </Badge>
          </div>
          <div className="text-2xl font-bold">R$ {cardData.limite.toLocaleString()}</div>
          <div className="text-sm opacity-75">Vencimento: {cardData.vencimento}</div>
        </div>

        {/* Gráfico de Limite */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Limite Usado</span>
            <span className="font-medium">{percentualUsado.toFixed(1)}%</span>
          </div>
          <Progress value={percentualUsado} className="h-3" />
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>Usado: R$ {cardData.usado.toLocaleString()}</div>
            <div>Disponível: R$ {cardData.disponivel.toLocaleString()}</div>
          </div>
        </div>

        {/* Compras Recentes */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Compras Recentes</span>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setShowDetails(!showDetails)}
              className="h-6 px-2"
            >
              {showDetails ? "Ocultar" : "Ver todas"}
            </Button>
          </div>
          
          <div className="space-y-2">
            {cardData.compras.slice(0, showDetails ? 4 : 2).map((compra, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-3 w-3 text-destructive" />
                  <div>
                    <div className="text-sm font-medium">{compra.descricao}</div>
                    <div className="text-xs text-muted-foreground">{compra.data}</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-destructive">
                  -R$ {compra.valor.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-muted/30 rounded p-2">
            <div className="text-sm font-bold text-primary">{cardData.compras.length}</div>
            <div className="text-xs text-muted-foreground">Compras</div>
          </div>
          <div className="bg-muted/30 rounded p-2">
            <div className="text-sm font-bold text-destructive">R$ {cardData.usado}</div>
            <div className="text-xs text-muted-foreground">Gasto Mensal</div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Calendar className="h-3 w-3 mr-1" />
            Fatura
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            Histórico
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};