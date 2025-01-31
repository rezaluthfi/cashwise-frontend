import React, { useState } from "react";
import { Eye, EyeOff, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Summary {
  totalBalance: number;
  cumulativeBalanceDifference: number;
}

interface BalanceCardProps {
  summary: Summary;
  formatRupiah: (amount: number, options?: { abbreviate?: boolean }) => string;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ summary, formatRupiah }) => {
  const [showBalance, setShowBalance] = useState<boolean>(true);

  const toggleBalance = (): void => {
    setShowBalance(!showBalance);
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Lifetime Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative bg-blue-600 p-4 md:p-6 rounded-xl h-40 md:h-48 shadow-md">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <p className="text-sm text-white">Total Balance</p>
              <div className="flex justify-between items-center">
                <p className="text-gray-900 text-3xl font-bold mt-1">
                  {showBalance ? formatRupiah(summary.totalBalance) : "•••"}
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
                  {formatRupiah(summary.cumulativeBalanceDifference, {
                    abbreviate: true,
                  })}
                </p>
                {summary.cumulativeBalanceDifference > 0 ? (
                  <TrendingUp className="text-green-600" size={20} />
                ) : (
                  <TrendingDown className="text-red-600" size={20} />
                )}
              </div>
              <p className="text-sm text-white">
                {new Date().toLocaleDateString("id-ID", {
                  month: "2-digit",
                  year: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
