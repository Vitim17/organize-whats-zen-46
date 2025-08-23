import { Calendar, DollarSign, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { useTaskContext } from "@/contexts/TaskContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo } from "react";

export const ResumoCard = () => {
  const { tasks, getNextPendingTask, isTaskOverdue } = useTaskContext();
  
  const nextTask = useMemo(() => getNextPendingTask(), [getNextPendingTask]);
  const totalTasks = useMemo(() => tasks.length, [tasks]);
  const completedTasks = useMemo(() => tasks.filter(task => task.completed).length, [tasks]);
  const pendingTasks = useMemo(() => tasks.filter(task => !task.completed).length, [tasks]);

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
            <div className="flex items-center justify-center w-8 h-8 bg-primary-foreground/20 dark:bg-[#3a6604] rounded-full mx-auto mb-2 border dark:border-green-500/30">
              <Calendar className="h-4 w-4 text-primary-foreground dark:text-[#3c3c3c]" />
            </div>
            <div className="text-2xl font-bold text-primary-foreground dark:text-[#3c3c3c] drop-shadow-lg">{totalTasks}</div>
            <div className="text-xs text-primary-foreground/90 dark:text-[#3c3c3c] drop-shadow-md">Compromissos</div>
          </div>

          {/* Saldo */}
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-primary-foreground/20 dark:bg-[#3a6604] rounded-full mx-auto mb-2 border dark:border-green-500/30">
              <DollarSign className="h-4 w-4 text-primary-foreground dark:text-[#3c3c3c]" />
            </div>
            <div className="text-2xl font-bold text-primary-foreground dark:text-[#3c3c3c] drop-shadow-lg">R$ 2.450</div>
            <div className="text-xs text-primary-foreground/90 dark:text-[#3c3c3c] drop-shadow-md">Saldo Atual</div>
          </div>

          {/* Lembretes */}
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-primary-foreground/20 dark:bg-[#3a6604] rounded-full mx-auto mb-2 border dark:border-green-500/30">
              <Clock className="h-4 w-4 text-primary-foreground dark:text-[#3c3c3c]" />
            </div>
            <div className="text-2xl font-bold text-primary-foreground dark:text-[#3c3c3c] drop-shadow-lg">{pendingTasks}</div>
            <div className="text-xs text-primary-foreground/90 dark:text-[#3c3c3c] drop-shadow-md">Pendentes</div>
          </div>

          {/* Tarefas Concluídas */}
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-primary-foreground/20 dark:bg-[#3a6604] rounded-full mx-auto mb-2 border dark:border-green-500/30">
              <CheckCircle className="h-4 w-4 text-primary-foreground dark:text-[#3c3c3c]" />
            </div>
            <div className="text-2xl font-bold text-primary-foreground dark:text-[#3c3c3c] drop-shadow-lg">{completedTasks}/{totalTasks}</div>
            <div className="text-xs text-primary-foreground/90 dark:text-[#3c3c3c] drop-shadow-md">Concluídas</div>
          </div>
        </div>

        {/* Próximo compromisso */}
        <div className="bg-primary-foreground/10 dark:bg-[#3c3c3c] rounded-lg p-3 border dark:border-green-500/30">
          <div className="text-sm font-medium text-primary-foreground/95 dark:text-slate-200 mb-1 drop-shadow-md">Próximo Compromisso:</div>
          {nextTask ? (
            <div className="text-sm text-primary-foreground/90 dark:text-slate-300 drop-shadow-sm">
              {nextTask.title} - {format(nextTask.date, "dd/MM", { locale: ptBR })} às {nextTask.time}
              {isTaskOverdue(nextTask) && (
                <span className="ml-2 inline-flex items-center text-red-400 font-medium">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Atrasado
                </span>
              )}
            </div>
          ) : (
            <div className="text-sm text-primary-foreground/70 dark:text-slate-400 drop-shadow-sm italic">
              Nenhuma tarefa pendente
            </div>
          )}
        </div>
      </div>
    </DashboardCard>
  );
};