import React from "react";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ArrowUpDown, Target } from "lucide-react";
import { NavItem } from "./desktop-nav-item";
import { MonthGrid } from "../month-grid";
import { useMonthContext } from "@/hooks/month-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DesktopNavProps {
  className?: string;
  pathname: string;
}

const DesktopNav = ({ className, pathname }: DesktopNavProps) => {
  const { selectedMonth, setSelectedMonth } = useMonthContext();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: ArrowUpDown,
      label: "Transactions",
      href: "/transactions",
    },
    {
      icon: Target,
      label: "Budget",
      href: "/budget",
    },
  ];

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col pt-3 w-[360px] bg-white text-gray-900 rounded-2xl m-4",
        "border border-gray-300 shadow-xl",
        className
      )}
    >
      <div className="p-4">
        <div className="flex items-center gap-2 rounded-lg bg-blue-600 shadow-inner p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://ui-avatars.com/api/?name=Clark Kent &background=0D8ABC&color=fff"
              alt="@user"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium leading-none text-white">
              Clark Kent
            </p>
            <p className="text-xs leading-none text-blue-200">
              clarkkent@example.com
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-6 space-y-1">
        {menuItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname === item.href}
            className={cn(
              pathname === item.href
                ? "bg-blue-600 text-white" // Active state
                : "text-gray-900 hover:bg-blue-100 hover:text-blue-600", // Inactive state
              "flex items-center p-2 rounded-lg transition-colors duration-200"
            )}
          />
        ))}
      </nav>

      <MonthGrid
        selectedMonth={selectedMonth}
        onSelectMonth={(month) => {
          setSelectedMonth({ ...selectedMonth, month });
        }}
        onSelectYear={(year) => {
          setSelectedMonth({ ...selectedMonth, year });
        }}
        className="py-6"
      />

      <div className="p-6 text-center border-t border-gray-300">
        <p className="text-xs text-gray-500 hover:text-blue-600">
          {new Date().toLocaleString("default", { weekday: "long" })},{" "}
          {new Date().toLocaleString("default", { month: "long" })}{" "}
          {new Date().getDate()}, {new Date().getFullYear()}.
        </p>
      </div>
    </aside>
  );
};

export default DesktopNav;
