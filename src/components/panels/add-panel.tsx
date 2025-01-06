"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

interface AddPanelProps {
  onNewPanel: (newPanel: { title: string; queries: string[] }) => void;
}
const AddPanel = ({ onNewPanel }: AddPanelProps) => {
  const [title, setTitle] = useState<string>("");
  const [queries, setQueries] = useState<string[]>([""]);
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex items-center gap-2">
        <div className="w-32">عنوان پنل</div>
        <Input
          className="flex-1 h-7"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {queries.map((query, index) => (
        <div className="w-full flex items-center gap-2" key={index}>
          <div className="w-32">کوئری {index + 1}</div>
          <Input
            className="flex-1 h-7"
            dir="ltr"
            type="text"
            value={query}
            onChange={(e) =>
              setQueries((prev) => [
                ...prev.slice(0, index),
                e.target.value,
                ...prev.slice(index + 1),
              ])
            }
          />
        </div>
      ))}
      <div className="w-full py-2">
        <Button
          onClick={() => setQueries((prev) => [...prev, ""])}
          variant="secondary"
        >
          <PlusCircle className="size-4" />
          افزودن کوئری
        </Button>
      </div>

      <div className="w-full flex items-center justify-end">
        <Button
          className="w-32"
          onClick={() => onNewPanel({ title, queries })}
          variant="default"
        >
          ایجاد
        </Button>
      </div>
    </div>
  );
};

export default AddPanel;
