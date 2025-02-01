import React, { useState } from "react";
import { Eye, EyeOff, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBudgetData } from "@/hooks/use-budget-data";

const formatRupiah = (
  amount: number,
  options?: { abbreviate?: boolean }
): string => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (options?.abbreviate) {
    const thresholds = [
      { divisor: 1e12, suffix: "t" },
      { divisor: 1e9, suffix: "m" },
      { divisor: 1e6, suffix: "jt" },
      { divisor: 1e3, suffix: "rb" },
    ];

    const threshold = thresholds.find((t) => Math.abs(amount) >= t.divisor);

    if (threshold) {
      const formatted = new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
      }).format(amount / threshold.divisor);

      return `Rp${formatted}${threshold.suffix}`;
    }
  }

  return formatter.format(amount);
};

const BalanceCard: React.FC = () => {
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const { monthlyLimit, totalExpenses, loading, percentageUsed } =
    useBudgetData();

  const toggleBalance = (): void => {
    setShowBalance(!showBalance);
  };

  if (loading) {
    return (
      <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
        <CardContent className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const remainingBudget = monthlyLimit - totalExpenses;
  const isOverBudget = remainingBudget < 0;

  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Monthly Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative bg-blue-600 p-4 md:p-6 rounded-xl h-40 md:h-48 shadow-md">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <p className="text-sm text-white">Remaining Budget</p>
              <div className="flex justify-between items-center">
                <p className="text-white text-3xl font-bold mt-1">
                  {showBalance ? formatRupiah(remainingBudget) : "•••"}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleBalance}
                  className="text-white hover:bg-gray-300/20"
                >
                  {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-gray-300/50 px-4 py-2">
              <div className="flex items-center space-x-2">
                <p className="text-sm md:text-base font-medium text-white">
                  {formatRupiah(totalExpenses, {
                    abbreviate: true,
                  })}{" "}
                  / {formatRupiah(monthlyLimit, { abbreviate: true })}
                </p>
                {isOverBudget ? (
                  <TrendingDown className="text-red-400" size={20} />
                ) : (
                  <TrendingUp className="text-green-400" size={20} />
                )}
              </div>
              <p className="text-sm text-white">{percentageUsed.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
