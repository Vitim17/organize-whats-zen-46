import React, { useMemo, useCallback, useState, useEffect, useRef } from "react";
import { TrendingUp, Calendar, ChevronDown, Check } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";

// Tipagem para Chart.js
declare global {
  interface Window {
    Chart: any;
  }
}

export const GraficoFinanceiroCard = React.memo(() => {
  const [periodo, setPeriodo] = useState<"30dias" | "6meses" | "12meses">("30dias");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  const dadosGrafico = useMemo(() => {
    if (periodo === "30dias") {
      const datas = [];
      const hoje = new Date();
      for (let i = 29; i >= 0; i--) {
        const data = new Date(hoje);
        data.setDate(hoje.getDate() - i);
        const dia = data.getDate();
        const mes = data.getMonth() + 1;
        const dataFormatada = `${dia}/${mes}`;
        const diaSemana = data.getDay();
        const diaMes = data.getDate();
        let ganhos = 0;
        if (diaSemana === 0 || diaSemana === 6) {
          ganhos = Math.round(150 + Math.random() * 100);
        } else if (diaMes % 2 === 1) {
          ganhos = Math.round(180 + Math.random() * 80);
        }
        datas.push({
          data: dataFormatada,
          ganhos: ganhos,
          despesas: Math.round(80 + Math.random() * 60),
          patrimonio: ganhos - (80 + Math.random() * 60),
        });
      }
      return datas;
    } else if (periodo === "6meses") {
      return [
        { mes: "03/25", ganhos: 1000, despesas: 1050, patrimonio: -50 },
        { mes: "04/25", ganhos: 1000, despesas: 970, patrimonio: 30 },
        { mes: "05/25", ganhos: 1000, despesas: 1020, patrimonio: -20 },
        { mes: "06/25", ganhos: 1000, despesas: 1080, patrimonio: -80 },
        { mes: "07/25", ganhos: 1050, despesas: 960, patrimonio: 90 },
        { mes: "08/25", ganhos: 1050, despesas: 940, patrimonio: 110 },
      ];
    } else {
      // 12 meses
      return [
        { mes: "09/24", ganhos: 800, despesas: 750, patrimonio: 50 },
        { mes: "10/24", ganhos: 900, despesas: 820, patrimonio: 80 },
        { mes: "11/24", ganhos: 400, despesas: 320, patrimonio: 80 },
        { mes: "12/24", ganhos: 1000, despesas: 850, patrimonio: 150 },
        { mes: "01/25", ganhos: 1500, despesas: 1200, patrimonio: 300 },
        { mes: "02/25", ganhos: 1050, despesas: 980, patrimonio: 70 },
        { mes: "03/25", ganhos: 1000, despesas: 1050, patrimonio: -50 },
        { mes: "04/25", ganhos: 1000, despesas: 970, patrimonio: 30 },
        { mes: "05/25", ganhos: 1000, despesas: 1020, patrimonio: -20 },
        { mes: "06/25", ganhos: 1000, despesas: 1080, patrimonio: -80 },
        { mes: "07/25", ganhos: 1050, despesas: 960, patrimonio: 90 },
        { mes: "08/25", ganhos: 1050, despesas: 940, patrimonio: 110 },
      ];
    }
  }, [periodo]);

  // Aguardar o Chart.js carregar
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Criar o gráfico quando o componente estiver montado e os dados estiverem prontos
  useEffect(() => {
    if (isMounted && window.Chart && chartRef.current) {
      // Verificar se Chart.js está disponível e criar o gráfico
      const checkAndCreateChart = () => {
        if (window.Chart && chartRef.current) {
          // Destruir gráfico anterior se existir
          if (chartInstance.current) {
            try {
              chartInstance.current.destroy();
            } catch (error) {
              console.warn('Erro ao destruir gráfico:', error);
            }
          }

          const ctx = chartRef.current.getContext('2d');
          if (!ctx) return;

          // Preparar dados para o Chart.js
          const labels = dadosGrafico.map(item => periodo === "30dias" ? item.data : item.mes);
          const ganhosData = dadosGrafico.map(item => item.ganhos);
          const despesasData = dadosGrafico.map(item => item.despesas);

          // Criar o gráfico
          chartInstance.current = new window.Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Ganhos',
                  data: ganhosData,
                  borderColor: 'rgb(34, 197, 94)',
                  backgroundColor: 'rgba(34, 197, 94, 0.8)',
                  borderWidth: 1,
                  borderRadius: 4,
                  borderSkipped: false,
                },
                {
                  label: 'Despesas',
                  data: despesasData,
                  borderColor: 'rgb(239, 68, 68)',
                  backgroundColor: 'rgba(239, 68, 68, 0.8)',
                  borderWidth: 1,
                  borderRadius: 4,
                  borderSkipped: false,
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                intersect: false,
                mode: 'index',
              },
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                      size: 12
                    }
                  }
                },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  borderWidth: 1,
                  cornerRadius: 8,
                  displayColors: true,
                  callbacks: {
                    label: function(context: any) {
                      let label = context.dataset.label || '';
                      if (label) {
                        label += ': ';
                      }
                      if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(context.parsed.y);
                      }
                      return label;
                    }
                  }
                }
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Data',
                    font: {
                      size: 12
                    }
                  },
                  grid: {
                    display: false
                  },
                  ticks: {
                    maxTicksLimit: 10,
                    font: {
                      size: 10
                    }
                  }
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Valor (R$)',
                    font: {
                      size: 12
                    }
                  },
                  grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    drawBorder: false
                  },
                  ticks: {
                    font: {
                      size: 10
                    },
                    callback: function(value: any) {
                      return new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 0
                      }).format(value);
                    }
                  }
                }
              }
            }
          });
        }
      };

      // Tentar criar o gráfico imediatamente
      checkAndCreateChart();

      // Se não conseguir, tentar novamente após um pequeno delay
      if (!chartInstance.current) {
        setTimeout(checkAndCreateChart, 100);
      }
    }
  }, [periodo, dadosGrafico, isMounted]);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Cleanup do gráfico quando componente for desmontado
  useEffect(() => {
    return () => {
      if (chartInstance.current) {
        try {
          chartInstance.current.destroy();
        } catch (error) {
          console.warn('Erro ao destruir gráfico:', error);
        }
      }
    };
  }, []);

  const totalGanhos = useMemo(() => {
    return dadosGrafico.reduce((sum, item) => sum + item.ganhos, 0);
  }, [dadosGrafico]);

  const totalDespesas = useMemo(() => {
    return dadosGrafico.reduce((sum, item) => sum + item.despesas, 0);
  }, [dadosGrafico]);

  const totalPatrimonio = useMemo(() => {
    return dadosGrafico.reduce((sum, item) => sum + item.patrimonio, 0);
  }, [dadosGrafico]);

  const porcentagens = useMemo(() => {
    const total = totalGanhos + totalDespesas;
    return {
      ganhos: total > 0 ? ((totalGanhos / total) * 100).toFixed(1) : "0",
      despesas: total > 0 ? ((totalDespesas / total) * 100).toFixed(1) : "0",
      patrimonio: totalGanhos > 0 ? ((totalPatrimonio / totalGanhos) * 100).toFixed(1) : "0",
    };
  }, [totalGanhos, totalDespesas, totalPatrimonio]);

  return (
    <DashboardCard
      title="Evolução Financeira"
      icon={TrendingUp}
      className="w-full"
    >
      <div className="w-full space-y-2">
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full">
          <div className="text-sm text-muted-foreground">
            {periodo === "30dias" ? "Últimos 30 dias" : 
             periodo === "6meses" ? "Últimos 6 meses" : "Últimos 12 meses"}
          </div>
          <div className="flex items-center space-x-2">
            {isMounted && (
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className="w-full sm:w-52 md:w-56 lg:w-60 xl:w-64 justify-between relative px-4 py-2"
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="mr-2 text-sm sm:text-base truncate">
                      {periodo === "30dias" ? "Últimos 30 dias" : 
                       periodo === "6meses" ? "Últimos 6 meses" : "Últimos 12 meses"}
                    </span>
                    <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0" />
                  </div>
                  <div className="flex items-center ml-2 flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600 mr-2" />
                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </Button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-[#3c3c3c] border border-gray-200 dark:border-slate-600 rounded-lg shadow-lg z-50">
                    <div className="py-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPeriodo("30dias");
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center justify-between text-sm sm:text-base dark:text-slate-200"
                      >
                        <span className="truncate">Últimos 30 dias</span>
                        {periodo === "30dias" && <Check className="w-4 h-4 text-green-600 flex-shrink-0" />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPeriodo("6meses");
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center justify-between text-sm sm:text-base dark:text-slate-200"
                      >
                        <span className="truncate">Últimos 6 meses</span>
                        {periodo === "6meses" && <Check className="w-4 h-4 text-green-600 flex-shrink-0" />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPeriodo("12meses");
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center justify-between text-sm sm:text-base dark:text-slate-200"
                      >
                        <span className="truncate">Últimos 12 meses</span>
                        {periodo === "12meses" && <Check className="w-4 h-4 text-green-600 flex-shrink-0" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Gráfico */}
        <div className="w-full h-72 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] 2xl:h-[36rem]">
          {isMounted && (
            <canvas 
              ref={chartRef}
              id="graficoFinanceiro"
              className="w-full h-full"
            />
          )}
        </div>

        {/* Resumo dos totais */}
        <div className="pt-3 border-t w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center w-full">
            <div className="p-3 bg-green-50 dark:bg-[#3c3c3c] rounded-lg dark:border dark:border-green-500/30">
              <div className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400">
                R$ {totalGanhos.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Ganhos</div>
            </div>
            <div className="p-3 bg-red-50 dark:bg-[#3c3c3c] rounded-lg dark:border dark:border-red-500/30">
              <div className="text-lg sm:text-xl font-bold text-red-600 dark:text-red-400">
                R$ {totalDespesas.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Despesas</div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-[#3c3c3c] rounded-lg dark:border dark:border-green-500/30">
              <div className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400">
                R$ {totalPatrimonio.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Patrimônio</div>
            </div>
          </div>
        </div>

        {/* Porcentagens */}
        <div className="pt-3 border-t w-full">
          <h4 className="text-sm font-medium mb-3">Distribuição Financeira</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            <div className="text-center p-3 bg-green-50 dark:bg-[#3c3c3c] rounded-lg dark:border dark:border-green-500/30">
              <div className="text-base font-bold text-green-600 dark:text-green-400">{porcentagens.ganhos}%</div>
              <div className="text-sm text-muted-foreground">Ganhos</div>
            </div>
            <div className="text-center p-3 bg-red-50 dark:bg-[#3c3c3c] rounded-lg dark:border dark:border-red-500/30">
              <div className="text-base font-bold text-red-600 dark:text-red-400">{porcentagens.despesas}%</div>
              <div className="text-sm text-muted-foreground">Despesas</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-[#3c3c3c] rounded-lg dark:border dark:border-green-500/30">
              <div className="text-base font-bold text-green-600 dark:text-green-400">{porcentagens.patrimonio}%</div>
              <div className="text-sm text-muted-foreground">Patrimônio</div>
            </div>
          </div>
        </div>

        {/* Dica */}
        <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-[#3c3c3c] p-2 rounded-lg dark:border dark:border-blue-500/30">
          💡 Selecione o período para visualizar sua evolução financeira
        </div>
      </div>
    </DashboardCard>
  );
});

GraficoFinanceiroCard.displayName = 'GraficoFinanceiroCard';
