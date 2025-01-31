import { ChevronDown, FileDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const ExportReportButton = ({
  isExporting,
  onExportPNG,
  onExportPDF,
}: {
  isExporting: boolean;
  onExportPNG: () => void;
  onExportPDF: () => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={`flex items-center px-4 py-2 rounded-lg transition-all ${
            isExporting
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          disabled={isExporting}
        >
          <ChevronDown className="mr-2 h-5 w-5" />
          Export Report
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-lg">
        <DropdownMenuItem
          onClick={onExportPNG}
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-all"
        >
          <FileDown className="mr-2 h-5 w-5 text-blue-600" />
          Export as PNG
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onExportPDF}
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-all"
        >
          <FileDown className="mr-2 h-5 w-5 text-red-600" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
