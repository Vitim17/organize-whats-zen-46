import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export interface Task {
  id: number;
  title: string;
  date: Date;
  time: string;
  completed: boolean;
  priority: "alta" | "média" | "baixa";
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  toggleTaskCompletion: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
  getNextPendingTask: () => Task | null;
  isTaskOverdue: (task: Task) => boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext deve ser usado dentro de um TaskProvider");
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 1, 
      title: "Reunião com cliente", 
      date: new Date(), 
      time: "14:30", 
      completed: false, 
      priority: "média" 
    },
    { 
      id: 2, 
      title: "Revisar relatórios", 
      date: new Date(), 
      time: "16:00", 
      completed: true, 
      priority: "média" 
    },
    { 
      id: 3, 
      title: "Ligar para fornecedor", 
      date: new Date(), 
      time: "17:30", 
      completed: false, 
      priority: "baixa" 
    },
  ]);

  const addTask = useCallback((taskData: Omit<Task, "id">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now()
    };
    setTasks(prev => [...prev, newTask]);
  }, []);

  const toggleTaskCompletion = useCallback((taskId: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  const deleteTask = useCallback((taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, []);

  const isTaskOverdue = useCallback((task: Task): boolean => {
    if (task.completed) return false;
    
    const now = new Date();
    const taskDateTime = new Date(task.date);
    const [hours, minutes] = task.time.split(':').map(Number);
    taskDateTime.setHours(hours, minutes, 0, 0);
    
    return now > taskDateTime;
  }, []);

  const getNextPendingTask = useCallback((): Task | null => {
    const pendingTasks = tasks.filter(task => !task.completed);
    
    if (pendingTasks.length === 0) return null;
    
    // Ordenar por data e hora, prioridade e se está atrasado
    return pendingTasks.sort((a, b) => {
      const aOverdue = isTaskOverdue(a);
      const bOverdue = isTaskOverdue(b);
      
      // Tarefas atrasadas têm prioridade máxima
      if (aOverdue && !bOverdue) return -1;
      if (!aOverdue && bOverdue) return 1;
      
      // Se ambas estão atrasadas ou ambas não estão, ordenar por data/hora
      const aDateTime = new Date(a.date);
      const bDateTime = new Date(b.date);
      const [aHours, aMinutes] = a.time.split(':').map(Number);
      const [bHours, bMinutes] = b.time.split(':').map(Number);
      aDateTime.setHours(aHours, aMinutes, 0, 0);
      bDateTime.setHours(bHours, bMinutes, 0, 0);
      
      if (aDateTime.getTime() !== bDateTime.getTime()) {
        return aDateTime.getTime() - bDateTime.getTime();
      }
      
      // Se mesma data/hora, ordenar por prioridade
      const priorityOrder = { alta: 3, média: 2, baixa: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    })[0];
  }, [tasks, isTaskOverdue]);

  const contextValue: TaskContextType = {
    tasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    getNextPendingTask,
    isTaskOverdue
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};
