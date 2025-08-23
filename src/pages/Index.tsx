import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResumoCard } from "@/components/dashboard/ResumoCard";
import { AgendaCard } from "@/components/dashboard/AgendaCard";
import { ConectividadeCard } from "@/components/dashboard/ConectividadeCard";
import { CategoriasCard } from "@/components/dashboard/CategoriasCard";
import { InteligenciaCard } from "@/components/dashboard/InteligenciaCard";
import { FinanceiroCard } from "@/components/dashboard/FinanceiroCard";
import { GraficoFinanceiroCard } from "@/components/dashboard/GraficoFinanceiroCard";
import { OrcamentosCard } from "@/components/dashboard/OrcamentosCard";
import { MetasFinanceirasCard } from "@/components/dashboard/MetasFinanceirasCard";
import { CartaoCreditoCard } from "@/components/dashboard/CartaoCreditoCard";
import { AutomacoesCard } from "@/components/dashboard/AutomacoesCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {/* Primeira Linha - Cards Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <ResumoCard />
          <AgendaCard />
          <ConectividadeCard />
          <CategoriasCard />
        </div>

        {/* Segunda Linha - Inteligência e Financeiro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <InteligenciaCard />
          <FinanceiroCard />
        </div>

        {/* Gráfico Financeiro - Full width */}
        <div className="mt-4">
          <GraficoFinanceiroCard />
        </div>

        {/* Orçamentos & Metas - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <OrcamentosCard />
          <MetasFinanceirasCard />
        </div>

        {/* Cartão de Crédito & Automações - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <CartaoCreditoCard />
          <AutomacoesCard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
