import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { useFinancialContext } from "@/contexts/FinancialContext";

export const FinanceiroCard = () => {
  const { 
    transactions, 
    getTotalIncome, 
    getTotalExpenses, 
    getTotalBalance 
  } = useFinancialContext();

  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const totalBalance = getTotalBalance();

  const recentTransactions = transactions.slice(0, 3);

  return (
    <DashboardCard title="Financeiro" icon={DollarSign}>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-success-light/20 dark:bg-[#3c3c3c] rounded-lg p-2.5 text-center border dark:border-green-500/30">
            <TrendingUp className="h-4 w-4 text-success dark:text-green-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-success dark:text-green-400">
              R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-muted-foreground dark:text-slate-300">Entradas</div>
          </div>
          <div className="bg-destructive/10 dark:bg-[#3c3c3c] rounded-lg p-2.5 text-center border dark:border-red-500/30">
            <TrendingDown className="h-4 w-4 text-destructive dark:text-red-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-destructive dark:text-red-400">
              R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-muted-foreground dark:text-slate-300">Saídas</div>
          </div>
        </div>

        <div className="bg-gradient-primary dark:bg-[#3c3c3c] rounded-lg p-3 text-primary-foreground dark:text-white text-center border dark:border-blue-400/50">
          <div className="text-sm opacity-90 mb-1 dark:text-blue-100">Saldo Atual</div>
          <div className="text-2xl font-bold dark:text-white">
            R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium dark:text-slate-200">Recentes</div>
          </div>
          
          <div className="space-y-1.5">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-2 bg-muted/30 dark:bg-[#3c3c3c] rounded-lg border dark:border-slate-600/50">
                  <div className="flex items-center space-x-2">
                    {transaction.type === "entrada" ? (
                      <TrendingUp className="h-3 w-3 text-success dark:text-green-400" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-destructive dark:text-red-400" />
                    )}
                    <div>
                      <div className="text-sm font-medium dark:text-slate-200">{transaction.description}</div>
                      <div className="text-xs text-muted-foreground dark:text-slate-400">
                        {transaction.date.toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                  <div className={`text-sm font-bold ${
                    transaction.type === "entrada" ? "text-success dark:text-green-400" : "text-destructive dark:text-red-400"
                  }`}>
                    {transaction.type === "entrada" ? "+" : ""}R$ {transaction.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-3 text-muted-foreground dark:text-slate-400">
                <p className="text-sm">Nenhuma transação ainda</p>
                <p className="text-xs">Gerencie suas finanças pelo WhatsApp</p>
              </div>
            )}
          </div>
        </div>

        {/* Dica */}
        <div className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-[#3c3c3c] p-2 rounded-lg dark:border dark:border-green-500/30">
          💡 Gerencie suas transações diretamente pelo WhatsApp
        </div>
      </div>
    </DashboardCard>
  );
};