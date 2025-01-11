import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { EllipsisVertical, LucideIcon } from "lucide-react";

interface DropdownButtonProps {
  className?: string;
  items: {
    title: string;
    icon: LucideIcon;
    onClick: (e) => void;
    className?: string;
  }[];
  side?: "left" | "right" | "top" | "bottom";
}

export default function DropdownButton({
  className,
  items,
  side = "right",
}: DropdownButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn("rounded-full shadow-none size-5 px-0", className)}
          aria-label="Open edit menu"
        >
          <EllipsisVertical size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={side}>
        {items.map(
          ({ title, icon: Icon, onClick, className: itemClassName }) => (
            <DropdownMenuItem
              dir="rtl"
              key={title}
              onClick={onClick}
              className={itemClassName}
            >
              <Icon className="size-4" /> {title}
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
