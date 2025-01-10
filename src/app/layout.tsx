"use client";

import AppSidebar, { AppSidebarHandle } from "@/components/app-sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MenuIcon } from "lucide-react";
import { useRef } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const sidebarRef = useRef<AppSidebarHandle>(null);

  return (
    <html lang="en">
      <body className="antialiased font-yekan bg-slate-200 relative">
        <QueryClientProvider client={queryClient}>
          <header
            className="h-14 bg-white shadow-md gap-2 border-b flex items-center px-4 font-bold text-lg fixed top-0 left-0 right-0 z-10"
            dir="rtl"
            id="header"
          >
            <button onClick={() => sidebarRef.current?.toggleSidebar()}>
              <MenuIcon className="size-6" />
            </button>
            <div className="mr-2">پروژه دانا</div>
          </header>
          <AppSidebar ref={sidebarRef} />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
