import { Transaction } from "@/lib/api";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

interface TransactionItemProps {
  transaction: Transaction;
  formatRupiah: (amount: number) => string;
}

export const TransactionItem = ({
  transaction,
  formatRupiah,
}: TransactionItemProps) => {
  const isIncome = transaction.type === "income";

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        {/* Ikon transaksi */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center 
          ${
            isIncome
              ? "bg-emerald-100 text-emerald-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {isIncome ? (
            <ArrowUpCircle size={20} />
          ) : (
            <ArrowDownCircle size={20} />
          )}
        </div>

        {/* Detail transaksi */}
        <div className="flex flex-col">
          <span className="text-sm md:text-base text-gray-700 font-medium">
            {transaction.description}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(transaction.date).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
            })}
          </span>
        </div>
      </div>

      {/* Jumlah uang */}
      <span
        className={`text-sm md:text-base font-semibold ${
          isIncome ? "text-emerald-600" : "text-red-600"
        }`}
      >
        {formatRupiah(Math.abs(transaction.amount))}
      </span>
    </div>
  );
};
