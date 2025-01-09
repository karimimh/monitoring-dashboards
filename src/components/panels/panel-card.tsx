"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { PenIcon, TrashIcon } from "lucide-react";

interface PanelCardProps {
  title: string;
  className?: string;
  children?: ReactNode;
  childContainerClassName?: string;
  onEditButtonClick?: () => void;
  onDeleteButtonClick?: () => void;
}

const PanelCard = ({
  title,
  className,
  childContainerClassName,
  children,
  onEditButtonClick,
  onDeleteButtonClick,
}: PanelCardProps) => {
  return (
    <div
      className={cn(
        "shadow rounded-lg border flex flex-col overflow-clip bg-white",
        className
      )}
    >
      <div
        className="p-3 pl-10 flex justify-normal gap-4 items-center h-12"
        dir="rtl"
      >
        <div className="text-lg font-bold">{title}</div>
        <Button onClick={onEditButtonClick} variant="secondary">
          <PenIcon className="size-4" />
        </Button>
        <Button onClick={onDeleteButtonClick} variant="destructive">
          <TrashIcon className="size-4" />
        </Button>
      </div>
      <div className={cn("flex-1 w-full", childContainerClassName)}>
        {children}
      </div>
    </div>
  );
};

export default PanelCard;
