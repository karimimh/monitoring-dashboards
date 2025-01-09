"use client";

import { cn } from "@/lib/utils";
import { BellIcon, LayoutDashboardIcon, ServerIcon } from "lucide-react";
import Link from "next/link";
import { forwardRef, useImperativeHandle, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AppSidebarProps {}

export interface AppSidebarHandle {
  toggleSidebar: () => void;
}

const AppSidebar = forwardRef<AppSidebarHandle, AppSidebarProps>(({}, ref) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    toggleSidebar: () => setSidebarOpen((prev) => !prev),
  }));

  const items = [
    {
      icon: LayoutDashboardIcon,
      title: "داشبوردها",
      href: "/",
    },
    {
      icon: ServerIcon,
      title: "سرورها",
      href: "/servers",
    },
    {
      icon: BellIcon,
      title: "اعلان‌ها",
      href: "/notifications",
    },
  ];
  return (
    <aside
      className={cn(
        "w-[18rem] z-10 fixed px-4 py-6 transition-transform ease-out transform bg-white right-0 top-14 bottom-0 border-l flex flex-col justify-start items-stretch overflow-y-auto shadow-md",
        isSidebarOpen ? "translate-x-0" : "translate-x-[18rem]"
      )}
      dir="rtl"
    >
      {items.map(({ icon: Icon, href, title }) => (
        <Link
          className="flex items-center gap-2 h-10 cursor-pointer hover:text-blue-600"
          href={href}
          key={title}
        >
          <Icon className="size-4" />
          {title}
        </Link>
      ))}
    </aside>
  );
});

AppSidebar.displayName = "AppSidebar";

export default AppSidebar;
