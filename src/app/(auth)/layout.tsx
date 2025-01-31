import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-6">
        {children}
      </main>
    </div>
  );
}
