import { Calendar, DollarSign, Clock, CheckCircle } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";

export const ResumoCard = () => {
  return (
    <DashboardCard 
      title="Resumo Diário" 
      icon={Calendar}
      variant="primary"
      className="col-span-full lg:col-span-2"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Compromissos do dia */}
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-primary-foreground/20 rounded-full mx-auto mb-2">
              <Calendar className="h-4 w-4" />
            </div>
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs opacity-80">Compromissos</div>
          </div>

          {/* Saldo */}
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-primary-foreground/20 rounded-full mx-auto mb-2">
              <DollarSign className="h-4 w-4" />
            </div>
            <div className="text-2xl font-bold">R$ 2.450</div>
            <div className="text-xs opacity-80">Saldo Atual</div>
          </div>

          {/* Lembretes */}
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-primary-foreground/20 rounded-full mx-auto mb-2">
              <Clock className="h-4 w-4" />
            </div>
            <div className="text-2xl font-bold">5</div>
            <div className="text-xs opacity-80">Lembretes</div>
          </div>

          {/* Tarefas Concluídas */}
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-primary-foreground/20 rounded-full mx-auto mb-2">
              <CheckCircle className="h-4 w-4" />
            </div>
            <div className="text-2xl font-bold">8/12</div>
            <div className="text-xs opacity-80">Concluídas</div>
          </div>
        </div>

        {/* Próximo compromisso */}
        <div className="bg-primary-foreground/10 rounded-lg p-3">
          <div className="text-sm font-medium opacity-90 mb-1">Próximo Compromisso:</div>
          <div className="text-sm opacity-80">Reunião com cliente - 14:30</div>
        </div>
      </div>
    </DashboardCard>
  );
};