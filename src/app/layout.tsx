"use client";

import AppSidebar from "@/components/app-sidebar";
import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className="antialiased font-yekan bg-slate-200 relative">
        <QueryClientProvider client={queryClient}>
          <header
            className="h-14 bg-white shadow-md gap-2 border-b flex items-center px-4 font-bold text-lg fixed top-0 left-0 right-0 z-10"
            dir="rtl"
            id="header"
          >
            <button onClick={() => setSidebarOpen((prev) => !prev)}>
              <MenuIcon className="size-6" />
            </button>
            <div className="mr-2">پروژه دانا</div>
          </header>
          <AppSidebar isOpen={isSidebarOpen} />
          <div
            className={cn(
              "absolute left-0 top-0 pt-14 bg-slate-200 min-h-screen",
              isSidebarOpen ? "right-[18rem]" : "right-0"
            )}
          >
            {children}
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
