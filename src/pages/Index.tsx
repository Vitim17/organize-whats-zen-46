import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResumoCard } from "@/components/dashboard/ResumoCard";
import { AgendaCard } from "@/components/dashboard/AgendaCard";
import { FinanceiroCard } from "@/components/dashboard/FinanceiroCard";
import { InteligenciaCard } from "@/components/dashboard/InteligenciaCard";
import { ConectividadeCard } from "@/components/dashboard/ConectividadeCard";
import { CategoriasCard } from "@/components/dashboard/CategoriasCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Resumo Diário - Takes full width on mobile, 2 columns on large screens */}
          <div className="col-span-full lg:col-span-2">
            <ResumoCard />
          </div>
          
          {/* Agenda & Tarefas */}
          <div className="col-span-1 lg:col-span-1">
            <AgendaCard />
          </div>
          
          {/* Conectividade */}
          <div className="col-span-1 lg:col-span-1">
            <ConectividadeCard />
          </div>
          
          {/* Financeiro */}
          <div className="col-span-1 lg:col-span-1">
            <FinanceiroCard />
          </div>
          
          {/* Inteligência & Relatórios */}
          <div className="col-span-1 lg:col-span-1">
            <InteligenciaCard />
          </div>
          
          {/* Categorias Ilimitadas */}
          <div className="col-span-1 lg:col-span-2">
            <CategoriasCard />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
