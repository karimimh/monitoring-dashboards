"use client";

import {
  Select as CNSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SelectProps {
  options: string[];
  value?: string;
  onValueChange?: (v: string) => void;
}

const Select = ({ options, onValueChange, value }: SelectProps) => {
  return (
    <CNSelect value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="انتخاب کنید..." />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </CNSelect>
  );
};

export default Select;
