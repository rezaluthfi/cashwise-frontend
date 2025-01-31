import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Transaction } from "@/lib/api";
import { TransactionItem } from "./transaction-item";

interface RecentTransactionsProps {
  transactions: Transaction[];
  formatRupiah: (amount: number) => string;
}

export const RecentTransactions = ({
  transactions,
  formatRupiah,
}: RecentTransactionsProps) => (
  <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-lg font-semibold text-gray-700">
        Recent Transactions
      </CardTitle>
      <Button variant="ghost" size="sm" asChild>
        <Link
          href="/transactions"
          className="text-blue-600 text-sm font-medium flex items-center"
        >
          View All
          <ChevronRight className="ml-1" width="16px" height="16px" />
        </Link>
      </Button>
    </CardHeader>
    <CardContent className="space-y-4">
      {transactions.length > 0 ? (
        transactions
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 3)
          .map((transaction) => (
            <TransactionItem
              key={transaction._id}
              transaction={transaction}
              formatRupiah={formatRupiah}
            />
          ))
      ) : (
        <p className="text-gray-500 text-sm text-center">
          No recent transactions
        </p>
      )}
    </CardContent>
  </Card>
);
