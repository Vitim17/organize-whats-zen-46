import { Tags, Plus, Edit2, Trash2, BarChart3 } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

export const CategoriasCard = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = [
    { 
      name: "Trabalho", 
      count: 23, 
      color: "bg-primary", 
      gastoAtual: 850.50, 
      limite: 1200,
      gastos: [
        { item: "Material escritório", valor: 120.30 },
        { item: "Software", valor: 299.90 },
        { item: "Transporte", valor: 430.30 }
      ]
    },
    { 
      name: "Pessoal", 
      count: 15, 
      color: "bg-success", 
      gastoAtual: 1245.80, 
      limite: 1500,
      gastos: [
        { item: "Roupas", valor: 345.50 },
        { item: "Cuidados pessoais", valor: 180.30 },
        { item: "Diversos", valor: 720.00 }
      ]
    },
    { 
      name: "Financeiro", 
      count: 8, 
      color: "bg-destructive", 
      gastoAtual: 350.00, 
      limite: 500,
      gastos: [
        { item: "Tarifas bancárias", valor: 45.00 },
        { item: "Investimentos", valor: 305.00 }
      ]
    },
    { 
      name: "Saúde", 
      count: 5, 
      color: "bg-blue-500", 
      gastoAtual: 480.90, 
      limite: 800,
      gastos: [
        { item: "Consultas", valor: 280.00 },
        { item: "Medicamentos", valor: 200.90 }
      ]
    },
    { 
      name: "Lazer", 
      count: 12, 
      color: "bg-purple-500", 
      gastoAtual: 920.30, 
      limite: 1000,
      gastos: [
        { item: "Cinema", valor: 120.00 },
        { item: "Restaurantes", valor: 650.30 },
        { item: "Jogos", valor: 150.00 }
      ]
    },
  ];

  const handleEditCategory = (index: number) => {
    console.log("Editando categoria:", categories[index].name);
  };

  const handleDeleteCategory = (index: number) => {
    console.log("Excluindo categoria:", categories[index].name);
  };

  const handleAddCategory = () => {
    setShowAddForm(true);
    console.log("Abrindo formulário para nova categoria");
  };

  return (
    <DashboardCard title="Categorias & Orçamentos" icon={Tags}>
      <div className="space-y-4">
        {/* Header com botão de adicionar */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {categories.length} categorias ativas
          </div>
          <Button size="sm" className="h-7 px-2" onClick={handleAddCategory}>
            <Plus className="h-3 w-3 mr-1" />
            Nova
          </Button>
        </div>

        {/* Lista de categorias */}
        <div className="space-y-3">
          {categories.map((category, index) => {
            const percentualGasto = (category.gastoAtual / category.limite) * 100;
            const isExpanded = selectedCategory === index;
            
            return (
              <div key={index} className="border rounded-lg p-3 bg-muted/20">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setSelectedCategory(isExpanded ? null : index)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                    <div>
                      <div className="text-sm font-medium">{category.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {category.count} itens
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-sm font-bold">
                        R$ {category.gastoAtual.toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        de R$ {category.limite.toFixed(2)}
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        percentualGasto > 90 ? 'bg-destructive text-destructive-foreground' :
                        percentualGasto > 70 ? 'bg-yellow-500 text-white' :
                        'bg-success text-success-foreground'
                      }`}
                    >
                      {percentualGasto.toFixed(0)}%
                    </Badge>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditCategory(index);
                        }}
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0 text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(index);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Barra de progresso */}
                <div className="mt-2 space-y-1">
                  <Progress value={percentualGasto} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Gasto: R$ {category.gastoAtual.toFixed(2)}</span>
                    <span>Restante: R$ {(category.limite - category.gastoAtual).toFixed(2)}</span>
                  </div>
                </div>

                {/* Detalhes expandidos */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center mb-2">
                      <BarChart3 className="h-3 w-3 mr-1" />
                      <span className="text-xs font-medium">Principais Gastos</span>
                    </div>
                    <div className="space-y-1">
                      {category.gastos.map((gasto, gastoIndex) => (
                        <div key={gastoIndex} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{gasto.item}</span>
                          <span className="font-medium">R$ {gasto.valor.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Estatísticas */}
        <div className="bg-gradient-card rounded-lg p-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-bold text-primary">
                R$ {categories.reduce((sum, cat) => sum + cat.gastoAtual, 0).toFixed(0)}
              </div>
              <div className="text-xs text-muted-foreground">Total Gasto</div>
            </div>
            <div>
              <div className="text-lg font-bold text-success">{categories.length}</div>
              <div className="text-xs text-muted-foreground">Categorias</div>
            </div>
            <div>
              <div className="text-lg font-bold text-muted-foreground">
                {categories.reduce((sum, cat) => sum + cat.count, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Itens Total</div>
            </div>
          </div>
        </div>

        {/* Dica */}
        <div className="text-xs text-muted-foreground text-center">
          💡 Clique em uma categoria para ver os detalhes dos gastos
        </div>
      </div>
    </DashboardCard>
  );
};