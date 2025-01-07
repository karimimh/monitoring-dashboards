"use client";

import { PlusCircle, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Panel } from "@/types/panel";
import { getRandomColor } from "@/utils/color";
import { generateId } from "@/utils/random";

interface AddPanelProps {
  onNewPanel: (newPanel: Panel) => void;
}
const AddPanel = ({ onNewPanel }: AddPanelProps) => {
  const [title, setTitle] = useState<string>("");
  const [queries, setQueries] = useState<string[]>([""]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center" variant="outline">
          <PlusIcon className="size-4" />
          <span>افزودن پنل</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[70vh] overflow-y-auto" dir="rtl">
        <DialogTitle className="w-full text-center">افزودن پنل</DialogTitle>
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
              onClick={() => {
                onNewPanel({
                  title,
                  queries,
                  colors: queries.map(() => getRandomColor()),
                  id: generateId(),
                });
                setIsOpen(false);
              }}
              variant="default"
            >
              ایجاد
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPanel;
