"use client";
import { useEffect, useState } from "react";
import { transactionsApi, type Transaction } from "@/lib/api";
import { TransactionsFilters } from "@/components/transactions/transaction-filter";
import { TransactionsTable } from "@/components/transactions/transaction-table";
import { TransactionsHeader } from "@/components/transactions/transaction-header";
import { useRouter, useSearchParams } from "next/navigation";

export default function TransactionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "date" as keyof Transaction,
    direction: "desc" as "asc" | "desc",
  });

  useEffect(() => {
    if (searchParams.get("action") === "add") {
      setIsDialogOpen(true);
    }
  }, [searchParams]);

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);

    if (!open) {
      const params = new URLSearchParams(searchParams);
      params.delete("action");
      router.replace(`/transactions?${params.toString()}`, { scroll: false });
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await transactionsApi.getAll();
      setTransactions(response.data);
      setFilteredTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    let filtered = [...transactions];
    if (typeFilter !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.type === typeFilter
      );
    }
    if (searchTerm) {
      filtered = filtered.filter((transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (sortConfig.key === "date") {
        return sortConfig.direction === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortConfig.key === "amount") {
        return sortConfig.direction === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
      return 0;
    });
    setFilteredTransactions(filtered);
  }, [transactions, typeFilter, searchTerm, sortConfig]);

  const handleSort = (key: keyof Transaction) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleUpdateTransactions = (updatedTransactions: Transaction[]) => {
    setTransactions(updatedTransactions);
  };

  return (
    <div className="h-full flex flex-col gap-6 p-6">
      {/* 📌 Header & Filter (Bagian atas) */}
      <section className="bg-white shadow-md rounded-lg p-4 space-y-4">
        <TransactionsHeader
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={handleDialogOpenChange}
          onTransactionAdded={fetchTransactions}
        />
        <TransactionsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />
      </section>

      {/* 📌 Tabel Transaksi */}
      <section className="bg-white shadow-md rounded-lg p-4 flex-1 overflow-hidden">
        <TransactionsTable
          transactions={filteredTransactions}
          sortConfig={sortConfig}
          handleSort={handleSort}
          onUpdateTransactions={handleUpdateTransactions}
        />
      </section>
    </div>
  );
}
