import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStatCard } from "./dashboard-stat-card";

export interface Summary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;

  percentageIncome: number;
  percentageExpenses: number;
  percentageBalance: number;

  differenceIncome: number;
  differenceExpenses: number;

  totalBalance: number;
}

interface BalanceOverviewProps {
  summary: Summary;
  formatRupiah: (amount: number, options?: { abbreviate?: boolean }) => string;
}

export const BalanceOverview = ({
  summary,
  formatRupiah,
}: BalanceOverviewProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {/* Balance Card */}
    <Card className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 flex items-center justify-center flex-col">
      <CardHeader className="w-full text-center">
        <CardTitle className="text-lg font-semibold text-gray-700">
          Total Balance
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-4xl font-bold text-green-600">
            {formatRupiah(summary.balance)}
          </p>
          <p className="text-gray-500 text-sm mt-1">Updated this month</p>
        </div>
      </CardContent>
    </Card>

    {/* Income & Expenses */}
    <div className="space-y-6">
      <DashboardStatCard
        title="Total Earnings"
        amount={summary.totalIncome}
        percentage={summary.percentageIncome}
        difference={summary.differenceIncome}
        type="income"
        formatRupiah={formatRupiah}
      />
      <DashboardStatCard
        title="Total Spending"
        amount={summary.totalExpenses}
        percentage={summary.percentageExpenses}
        difference={summary.differenceExpenses}
        type="expense"
        formatRupiah={formatRupiah}
      />
    </div>
  </div>
);
