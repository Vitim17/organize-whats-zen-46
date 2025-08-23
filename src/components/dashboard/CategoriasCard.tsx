import { Tags } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { Badge } from "@/components/ui/badge";

export const CategoriasCard = () => {
  const categories = [
    { 
      id: 1,
      name: "Trabalho", 
      count: 23, 
      color: "bg-green-500",
      gastoAtual: 850.50, 
      limite: 1200.00,
      gastos: [
        { item: "Material de escritório", valor: 150.00 },
        { item: "Software", valor: 300.00 },
        { item: "Cursos", valor: 400.50 }
      ]
    },
    { 
      id: 2,
      name: "Pessoal", 
      count: 15, 
      color: "bg-green-500",
      gastoAtual: 1245.80, 
      limite: 1500.00,
      gastos: [
        { item: "Alimentação", valor: 800.00 },
        { item: "Transporte", valor: 200.00 },
        { item: "Lazer", valor: 245.80 }
      ]
    },
    { 
      id: 3,
      name: "Financeiro", 
      count: 8, 
      color: "bg-red-500",
      gastoAtual: 350.00, 
      limite: 500.00,
      gastos: [
        { item: "Investimentos", valor: 200.00 },
        { item: "Seguros", valor: 150.00 }
      ]
    },
    { 
      id: 4,
      name: "Saúde", 
      count: 5, 
      color: "bg-green-500", 
      gastoAtual: 480.90, 
      limite: 900.00,
      gastos: [
        { item: "Consultas", valor: 300.00 },
        { item: "Medicamentos", valor: 180.90 }
      ]
    },
    { 
      id: 5,
      name: "Lazer", 
      count: 10,
      color: "bg-purple-500", 
      gastoAtual: 920.30, 
      limite: 1000.00,
      gastos: [
        { item: "Viagens", valor: 500.00 },
        { item: "Restaurantes", valor: 250.00 },
        { item: "Hobbies", valor: 170.30 }
      ]
    }
  ];

  const totalGasto = categories.reduce((sum, cat) => sum + cat.gastoAtual, 0);
  const totalItens = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <DashboardCard
      title="Categorias & Orçamentos"
      icon={Tags}
      className="col-span-1"
    >
      <div className="space-y-4">
        {/* Lista de Categorias */}
        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-3 bg-white dark:bg-[#3c3c3c] rounded-lg border border-gray-200 dark:border-slate-600"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-slate-200">{category.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-slate-400">{category.count} itens</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-medium text-gray-900 dark:text-slate-200">
                  R$ {category.gastoAtual.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500 dark:text-slate-400">
                  de R$ {category.limite.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo */}
        <div className="pt-4 border-t border-gray-200 dark:border-slate-600">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-slate-300">
              Total Gasto: <span className="font-medium text-gray-900 dark:text-slate-200">R$ {totalGasto.toFixed(0)}</span>
            </div>
            <div className="flex space-x-4 text-sm text-gray-600 dark:text-slate-300">
              <span>Categorias: <span className="font-medium text-gray-900 dark:text-slate-200">{categories.length}</span></span>
              <span>Itens Total: <span className="font-medium text-gray-900 dark:text-slate-200">{totalItens}</span></span>
            </div>
          </div>
        </div>

        {/* Dica */}
        <div className="text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-[#3c3c3c] p-2 rounded-lg dark:border dark:border-yellow-500/30">
          💡 Edite suas categorias diretamente pelo WhatsApp
        </div>
      </div>
    </DashboardCard>
  );
};