"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Header() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  return (
    <header className="h-16 border-b border-blue-600 flex items-center justify-between mx-6">
      <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
        CashWise
      </Link>
      <Button
        className="border-l-4 border-blue-600"
        size="icon"
        variant="ghost"
        onClick={handleLogout}
      >
        <LogOut />
      </Button>
    </header>
  );
}
