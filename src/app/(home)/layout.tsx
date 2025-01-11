"use client";

import AppSidebar from "@/components/app-sidebar";
import DropdownButton from "@/components/ui/dropdown-button";
import { cn } from "@/lib/utils";
import { httpClient } from "@/services/http-client";
import { CircleUserIcon, LogOut, MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    httpClient.defaults.headers.common["Authorization"] = token;
    if (!token) router.push("/login");
  }, [router]);

  return (
    <>
      <header
        className="h-14 bg-white shadow-md gap-2 border-b flex items-center px-4 font-bold text-lg fixed top-0 left-0 right-0 z-10"
        dir="rtl"
        id="header"
      >
        <button onClick={() => setSidebarOpen((prev) => !prev)}>
          <MenuIcon className="size-6" />
        </button>
        <div className="mr-2">پروژه دانا</div>
        <div className="flex-1" />
        {/* Profile Card */}
        <div className="flex items-center gap-2 shadow border rounded-md px-3 py-1 w-60">
          <CircleUserIcon className="size-4" />
          <div className="flex-1">{localStorage?.getItem("username")}</div>
          <DropdownButton
            items={[
              {
                icon: LogOut,
                title: "خروج",
                onClick: () => router.push("/logout"),
                className: "text-red-500",
              },
            ]}
          />
        </div>
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
    </>
  );
}
