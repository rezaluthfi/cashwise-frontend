import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BudgetAlerts } from "../budget/budget-alert";
import { useBudgetData } from "@/hooks/use-budget-data";

export const DashboardNotificationCard = () => {
  const { totalExpenses, monthlyLimit, percentageUsed } = useBudgetData();

  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-700">
          Notifications
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:bg-gray-100"
          asChild
        ></Button>
      </CardHeader>

      <CardContent className="space-y-4 p-4">
        {percentageUsed < 80 ? (
          <p className="text-center text-gray-600 text-sm">Nothing for today</p>
        ) : (
          <BudgetAlerts
            totalExpenses={totalExpenses}
            monthlyLimit={monthlyLimit}
            percentageUsed={percentageUsed}
            budgetDetails={true}
          />
        )}
      </CardContent>
    </Card>
  );
};
