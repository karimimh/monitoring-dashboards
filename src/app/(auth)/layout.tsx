"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/dashboards");
  }, [router]);
  return (
    <div
      className={cn(
        "absolute left-0 top-0 right-0 pt-14 bg-slate-200 min-h-screen"
      )}
    >
      {children}
    </div>
  );
}
