import { Button } from "@/components/ui/button";

interface ChartFilterButtonsProps {
  chartFilter: "all" | "income" | "expense";
  setChartFilter: (filter: "all" | "income" | "expense") => void;
}

export const ChartFilterButtons = ({
  chartFilter,
  setChartFilter,
}: ChartFilterButtonsProps) => (
  <div className="flex flex-wrap gap-3">
    {[
      { value: "all", label: "All" },
      { value: "income", label: "Earnings" },
      { value: "expense", label: "Spending" },
    ].map(({ value, label }) => (
      <Button
        key={value}
        variant={chartFilter === value ? "default" : "outline"}
        className={`px-6 py-2 rounded-lg transition-all ${
          chartFilter === value
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "border border-gray-300 text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => setChartFilter(value as "all" | "income" | "expense")}
      >
        {label}
      </Button>
    ))}
  </div>
);
