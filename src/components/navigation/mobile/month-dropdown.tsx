"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { MonthGrid } from "../month-grid";
import { useMonthContext } from "@/hooks/month-context";

interface MonthDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function MonthDropdown({
  isOpen,
  onClose,
  className,
}: MonthDropdownProps) {
  const { selectedMonth, setSelectedMonth } = useMonthContext();

  return (
    <div className={cn("relative", className)} data-dropdown>
      {isOpen && (
        <div
          className="fixed inset-0 top-auto bg-black/50 backdrop-blur-sm z-40"
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "fixed bottom-28 left-4 right-4 z-50 transform transition-all duration-300 ease-in-out",
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-full scale-95"
        )}
      >
        <div className="bg-gradient-to-b from-blue-700 to-blue-900 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-blue-600/40 shadow-blue-500/20">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-white font-medium text-lg">📆 Choose Month</h3>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white transition-all duration-200 transform hover:scale-110"
            >
              <ChevronDown className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <MonthGrid
            selectedMonth={selectedMonth}
            onSelectMonth={(month) => {
              setSelectedMonth({ ...selectedMonth, month });
              onClose();
            }}
            onSelectYear={(year) => {
              setSelectedMonth({ ...selectedMonth, year });
              onClose();
            }}
          />
        </div>
      </div>

      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 h-[5px] bg-blue-400/30 transition-transform duration-300",
          isOpen ? "transform-none" : "translate-y-full"
        )}
      />
    </div>
  );
}
