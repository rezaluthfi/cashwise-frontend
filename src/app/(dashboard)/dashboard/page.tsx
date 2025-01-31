"use client";
import { useRef, useState } from "react";
import { useMonthContext } from "@/hooks/month-context";
import { useTransactions } from "@/hooks/use-transactions";
import { useSummary } from "@/hooks/use-summary";
import { useExportReport } from "@/hooks/use-export-report";
import { processChartData } from "@/lib/chart-data";
import { formatRupiah } from "@/lib/utils";
import { SpendingOverview } from "@/components/charts/spending-overview";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ChartFilterButtons } from "@/components/dashboard/chart-filter-buttons";
import { BalanceOverview } from "@/components/dashboard/balance-overview";
import BalanceCard from "@/components/dashboard/total-balance-card";
import { RecentTransactions } from "@/components/dashboard/recent-transaction-card";
import { DashboardNotificationCard } from "@/components/dashboard/dashboard-notification-card";

export default function DashboardPage() {
  const { transactions } = useTransactions();
  const { selectedMonth } = useMonthContext();
  const { summary } = useSummary(transactions, selectedMonth);
  const reportRef = useRef<HTMLDivElement>(null);
  const { isExporting, exportAsPNG, exportAsPDF } = useExportReport(reportRef);
  const chartDataArray = processChartData(transactions, selectedMonth);
  const [chartFilter, setChartFilter] = useState<"all" | "income" | "expense">(
    "all"
  );

  return (
    <div className="h-full p-6 space-y-6">
      {/* Header & Export Buttons */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <DashboardHeader
          selectedMonth={selectedMonth}
          isExporting={isExporting}
          onExportPNG={exportAsPNG}
          onExportPDF={exportAsPDF}
        />
      </div>

      {/* Total Balance Full Width */}
      <BalanceCard summary={summary} formatRupiah={formatRupiah} />

      {/* Layout Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Kolom Kiri - Konten Utama */}
        <div className="space-y-6">
          {/* Filter Chart */}
          <div className="p-4 bg-white rounded-lg shadow">
            <ChartFilterButtons
              chartFilter={chartFilter}
              setChartFilter={setChartFilter}
            />
          </div>

          {/* Grafik Pengeluaran */}
          <SpendingOverview data={chartDataArray} filterType={chartFilter} />

          {/* Ringkasan Keuangan */}
          <BalanceOverview summary={summary} formatRupiah={formatRupiah} />
        </div>

        {/* Kolom Kanan - Sidebar */}
        <div className="flex flex-col space-y-6">
          {/* Notifikasi */}
          <DashboardNotificationCard />

          {/* Transaksi Terbaru */}
          <RecentTransactions
            transactions={transactions}
            formatRupiah={formatRupiah}
          />
        </div>
      </div>
    </div>
  );
}
