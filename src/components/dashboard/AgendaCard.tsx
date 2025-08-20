import { Calendar, Plus, CheckCircle2, Clock } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const AgendaCard = () => {
  const tasks = [
    { id: 1, title: "Reunião com cliente", time: "14:30", completed: false, priority: "alta" },
    { id: 2, title: "Revisar relatórios", time: "16:00", completed: true, priority: "média" },
    { id: 3, title: "Ligar para fornecedor", time: "17:30", completed: false, priority: "baixa" },
  ];

  const priorityColors = {
    alta: "bg-destructive",
    média: "bg-primary",
    baixa: "bg-success"
  };

  return (
    <DashboardCard title="Agenda & Tarefas" icon={Calendar}>
      <div className="space-y-4">
        {/* Header com botão de adicionar */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Hoje - {new Date().toLocaleDateString('pt-BR')}
          </div>
          <Button size="sm" className="h-7 px-2">
            <Plus className="h-3 w-3 mr-1" />
            Adicionar
          </Button>
        </div>

        {/* Lista de tarefas */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div 
              key={task.id}
              className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                task.completed ? 'bg-success-light/20' : 'bg-muted/50'
              }`}
            >
              <button className="flex-shrink-0">
                <CheckCircle2 
                  className={`h-4 w-4 ${
                    task.completed 
                      ? 'text-success fill-success/20' 
                      : 'text-muted-foreground hover:text-primary'
                  }`} 
                />
              </button>
              
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium ${
                  task.completed ? 'line-through text-muted-foreground' : ''
                }`}>
                  {task.title}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{task.time}</span>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs h-4 ${priorityColors[task.priority as keyof typeof priorityColors]} text-white`}
                  >
                    {task.priority}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-muted/30 rounded-lg p-3 flex justify-between text-center">
          <div>
            <div className="text-lg font-bold text-primary">12</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">8</div>
            <div className="text-xs text-muted-foreground">Concluídas</div>
          </div>
          <div>
            <div className="text-lg font-bold text-destructive">4</div>
            <div className="text-xs text-muted-foreground">Pendentes</div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};