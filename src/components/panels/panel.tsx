"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PanelProps {
  title: string;
  className?: string;
  children?: ReactNode;
  childContainerClassName?: string;
}

const Panel = ({
  title,
  className,
  childContainerClassName,
  children,
}: PanelProps) => {
  return (
    <div
      className={cn(
        "shadow rounded-lg border flex flex-col overflow-clip bg-white",
        className
      )}
    >
      <div className="p-3 pl-10 text-lg font-bold">{title}</div>
      <div className={cn("flex-1 w-full", childContainerClassName)}>{children}</div>
    </div>
  );
};

export default Panel;
