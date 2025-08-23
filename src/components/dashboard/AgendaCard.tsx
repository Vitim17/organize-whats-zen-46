import { Calendar as CalendarIcon, Clock, AlertTriangle } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { useTaskContext } from "@/contexts/TaskContext";

export const AgendaCard = () => {
  const { tasks, isTaskOverdue } = useTaskContext();

  const priorityColors = {
    alta: "bg-destructive",
    média: "bg-primary",
    baixa: "bg-success"
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;

  return (
    <DashboardCard title="Agenda & Tarefas" icon={CalendarIcon}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Hoje - {new Date().toLocaleDateString('pt-BR')}
          </div>
        </div>

        {/* Lista de tarefas */}
        <div className="space-y-3">
          {tasks.map((task) => {
            const isOverdue = isTaskOverdue(task);
            return (
              <div 
                key={task.id}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                  task.completed ? 'bg-success-light/20' : 
                  isOverdue ? 'bg-destructive-light/20' : 'bg-muted/50'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${
                    task.completed ? 'line-through text-muted-foreground' : ''
                  }`}>
                    {task.title}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className={`text-xs ${
                      isOverdue ? 'text-destructive font-medium' : 'text-muted-foreground'
                    }`}>
                      {task.date.toLocaleDateString('pt-BR')} às {task.time}
                      {isOverdue && !task.completed && (
                        <span className="ml-1 flex items-center">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Atrasado
                        </span>
                      )}
                    </span>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs h-4 ${priorityColors[task.priority]} text-white`}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="bg-muted/30 rounded-lg p-3 flex justify-between text-center">
          <div>
            <div className="text-lg font-bold text-primary">{tasks.length}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">{completedTasks}</div>
            <div className="text-xs text-muted-foreground">Concluídas</div>
          </div>
          <div>
            <div className="text-lg font-bold text-destructive">{pendingTasks}</div>
            <div className="text-xs text-muted-foreground">Pendentes</div>
          </div>
        </div>

        {/* Dica */}
        <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-[#3c3c3c] p-2 rounded-lg dark:border dark:border-blue-500/30">
          💡 Gerencie suas tarefas diretamente pelo WhatsApp
        </div>
      </div>
    </DashboardCard>
  );
};
