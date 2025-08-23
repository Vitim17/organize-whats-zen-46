import { useState, useMemo, useCallback } from 'react';

interface Categoria {
  name: string;
  count: number;
  color: string;
  gastoAtual: number;
  limite: number;
  gastos: Array<{ item: string; valor: number }>;
}

interface DadosFinanceiros {
  mes: string;
  ganhos: number;
  despesas: number;
  patrimonio: number;
}

export const useFinancialData = (categorias: Categoria[]) => {
  const [periodo, setPeriodo] = useState<"30dias" | "6meses" | "12meses">("30dias");

  // Memoizar o setter para evitar re-renders
  const handleSetPeriodo = useCallback((value: "30dias" | "6meses" | "12meses") => {
    setPeriodo(value);
  }, []);

  // Dados para os últimos 30 dias (como na primeira imagem)
  const dadosDiarios = useMemo(() => {
    if (!categorias || categorias.length === 0) return [];
    
    const datas = [];
    const hoje = new Date();

    for (let i = 29; i >= 0; i--) {
      const data = new Date(hoje);
      data.setDate(hoje.getDate() - i);
      
      // Formato: dia/mês (ex: 1/6, 2/6, 3/6)
      const dia = data.getDate();
      const mes = data.getMonth() + 1; // Janeiro é 0, então +1
      const dataFormatada = `${dia}/${mes}`;
      
      datas.push({
        data: dataFormatada,
        dataCompleta: data
      });
    }

    const totalDespesas = categorias.reduce((sum, cat) => sum + cat.gastoAtual, 0);
    const despesaMediaDiaria = totalDespesas / 30;

    return datas.map((item, index) => {
      // Simular entradas em dias específicos (como na primeira imagem)
      const diaSemana = item.dataCompleta.getDay();
      const diaMes = item.dataCompleta.getDate();

      let ganhos = 0;
      if (diaSemana === 0 || diaSemana === 6) {
        ganhos = Math.round(150 + Math.random() * 100); // Fins de semana
      } else if (diaMes % 2 === 1) {
        ganhos = Math.round(180 + Math.random() * 80); // Dias úteis alternados
      }

      // Despesas com variação realista (baseadas nas categorias)
      const variacao = 0.7 + Math.random() * 0.6;
      const despesas = Math.round(despesaMediaDiaria * variacao);

      return {
        data: item.data,
        ganhos: ganhos,
        despesas: despesas,
        patrimonio: ganhos - despesas,
      };
    });
  }, [categorias]);

  // Dados para o último mês (12 meses como na segunda imagem)
  const dadosMensais = useMemo(() => {
    if (!categorias || categorias.length === 0) return [];
    
    const totalDespesas = categorias.reduce((sum, cat) => sum + cat.gastoAtual, 0);
    const despesaMediaMensal = totalDespesas;

    return [
      { mes: "11/24", ganhos: 400, despesas: despesaMediaMensal * 0.9, patrimonio: 400 - despesaMediaMensal * 0.9 },
      { mes: "12/24", ganhos: 1000, despesas: despesaMediaMensal * 0.95, patrimonio: 1000 - despesaMediaMensal * 0.95 },
      { mes: "01/25", ganhos: 1500, despesas: despesaMediaMensal, patrimonio: 1500 - despesaMediaMensal },
      { mes: "02/25", ganhos: 1050, despesas: despesaMediaMensal * 0.98, patrimonio: 1050 - despesaMediaMensal * 0.98 },
      { mes: "03/25", ganhos: 1000, despesas: despesaMediaMensal * 1.05, patrimonio: 1000 - despesaMediaMensal * 1.05 },
      { mes: "04/25", ganhos: 1000, despesas: despesaMediaMensal * 0.97, patrimonio: 1000 - despesaMediaMensal * 0.97 },
      { mes: "05/25", ganhos: 1000, despesas: despesaMediaMensal * 1.02, patrimonio: 1000 - despesaMediaMensal * 1.02 },
      { mes: "06/25", ganhos: 1000, despesas: despesaMediaMensal * 1.08, patrimonio: 1000 - despesaMediaMensal * 1.08 },
      { mes: "07/25", ganhos: 1050, despesas: despesaMediaMensal * 0.96, patrimonio: 1050 - despesaMediaMensal * 0.96 },
      { mes: "08/25", ganhos: 1050, despesas: despesaMediaMensal * 0.94, patrimonio: 1050 - despesaMediaMensal * 0.94 },
      { mes: "09/25", ganhos: 1000, despesas: despesaMediaMensal * 1.01, patrimonio: 1000 - despesaMediaMensal * 1.01 },
      { mes: "10/25", ganhos: 1000, despesas: despesaMediaMensal * 0.99, patrimonio: 1000 - despesaMediaMensal * 0.99 },
    ];
  }, [categorias]);

  // Select data based on period
  const dadosGrafico = useMemo(() => {
    if (periodo === "30dias") {
      return dadosDiarios;
    } else if (periodo === "6meses") {
      return dadosMensais.slice(-6); // Últimos 6 meses
    } else {
      return dadosMensais; // 12 meses
    }
  }, [periodo, dadosDiarios, dadosMensais]);

  // Calculate percentages
  const porcentagens = useMemo(() => {
    if (!dadosGrafico || dadosGrafico.length === 0) {
      return { ganhos: "0", despesas: "0", patrimonio: "0" };
    }

    const totalGanhos = dadosGrafico.reduce((sum, item) => sum + item.ganhos, 0);
    const totalDespesas = dadosGrafico.reduce((sum, item) => sum + item.despesas, 0);
    const totalPatrimonio = dadosGrafico.reduce((sum, item) => sum + item.patrimonio, 0);

    return {
      ganhos: totalGanhos > 0 ? ((totalGanhos / (totalGanhos + totalDespesas)) * 100).toFixed(1) : "0",
      despesas: totalDespesas > 0 ? ((totalDespesas / (totalGanhos + totalDespesas)) * 100).toFixed(1) : "0",
      patrimonio: totalGanhos > 0 ? ((totalPatrimonio / totalGanhos) * 100).toFixed(1) : "0",
    };
  }, [dadosGrafico]);

  // Totals
  const totalGanhos = useMemo(() => {
    if (!dadosGrafico || dadosGrafico.length === 0) return 0;
    return dadosGrafico.reduce((sum, item) => sum + item.ganhos, 0);
  }, [dadosGrafico]);

  const totalDespesas = useMemo(() => {
    if (!dadosGrafico || dadosGrafico.length === 0) return 0;
    return dadosGrafico.reduce((sum, item) => sum + item.despesas, 0);
  }, [dadosGrafico]);

  const totalPatrimonio = useMemo(() => {
    if (!dadosGrafico || dadosGrafico.length === 0) return 0;
    return dadosGrafico.reduce((sum, item) => sum + item.patrimonio, 0);
  }, [dadosGrafico]);

  return {
    periodo,
    setPeriodo: handleSetPeriodo,
    dadosGrafico,
    porcentagens,
    totalGanhos,
    totalDespesas,
    totalPatrimonio,
    dadosMensais,
    dadosDiarios
  };
};
