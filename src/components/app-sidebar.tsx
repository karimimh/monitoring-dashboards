"use client";

import { cn } from "@/lib/utils";
import { BellIcon, LayoutDashboardIcon, ServerIcon } from "lucide-react";
import Link from "next/link";

interface AppSidebarProps {
  isOpen: boolean;
}

const AppSidebar = ({ isOpen }: AppSidebarProps) => {
  const items = [
    {
      icon: LayoutDashboardIcon,
      title: "داشبوردها",
      href: "/dashboards",
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
        isOpen ? "translate-x-0" : "translate-x-[18rem]"
      )}
      dir="rtl"
    >
      {items.map(({ icon: Icon, href, title }) => (
        <Link
          className="flex items-center gap-2 p-4 border-b cursor-pointer text-lg hover:text-blue-600"
          href={href}
          key={title}
        >
          <Icon className="size-5" />
          {title}
        </Link>
      ))}
      <div className="flex-1" />
      <div className="text-blue-600 text-sm">
        تهیه شده توسط{" "}
        <a href="tel:+989033336987" className="font-bold">
          Amir Mohammad Karimi
        </a>{" "}
      </div>
    </aside>
  );
};

export default AppSidebar;
