import { Card, CardContent } from "../ui/card";

interface StatCardProps {
  title: string;
  amount: number;
  percentage: number;
  difference: number;
  type: "income" | "expense";
  formatRupiah: (amount: number, options?: { abbreviate?: boolean }) => string;
}

export const DashboardStatCard = ({
  title,
  amount,
  percentage,
  difference,
  type,
  formatRupiah,
}: StatCardProps) => (
  <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
    <CardContent className="p-6">
      <div className="flex flex-col">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p
              className={`text-2xl font-bold ${
                type === "income" ? "text-green-600" : "text-red-500"
              }`}
            >
              {formatRupiah(amount)}
            </p>
          </div>
          <div
            className={`px-2 py-1 rounded font-medium text-sm ${
              type === "income"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {percentage > 0
              ? `+${percentage.toFixed(1)}`
              : percentage.toFixed(1)}
            %
          </div>
        </div>
        <p className="text-gray-500 text-xs">
          {difference === 0
            ? "Stable this month"
            : `${difference > 0 ? "Increased" : "Decreased"} by ${formatRupiah(
                Math.abs(difference),
                { abbreviate: true }
              )} this month`}
        </p>
      </div>
    </CardContent>
  </Card>
);
