"use client";

import { Panel } from "@/types/panel";
import { generateEmptyPanel } from "@/utils/random";
import { PlusCircle } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import AutogrowingTextarea from "../ui/autogrowing-textarea";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";

interface PanelFormProps {
  onSubmit: (panelForm: Panel) => void;
}

export interface PanelFormHandle {
  setIsOpen: (open: boolean) => void;
  setPanelForm: (panel: Panel) => void;
}

const PanelForm = forwardRef<PanelFormHandle, PanelFormProps>(
  ({ onSubmit: onNewPanel }, ref) => {
    const [value, setValue] = useState<Panel>(generateEmptyPanel());

    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({ setIsOpen, setPanelForm: setValue }));
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[70vh] overflow-y-auto" dir="rtl">
          <DialogTitle className="w-full text-center">افزودن پنل</DialogTitle>
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex items-center gap-2">
              <div className="w-32">عنوان پنل</div>
              <Input
                className="flex-1 h-7"
                type="text"
                value={value.title}
                onChange={(e) => setValue({ ...value, title: e.target.value })}
              />
            </div>
            {value.queries.map((query, index) => (
              <div className="w-full flex items-center gap-2" key={index}>
                <div className="w-32">کوئری {index + 1}</div>
                <AutogrowingTextarea
                  className="flex-1 h-7 font-sans text-xs"
                  value={query}
                  minRows={4}
                  maxRows={5}
                  onChange={(newQuery) => {
                    const prev = value.queries;
                    const newQueries = [
                      ...prev.slice(0, index),
                      newQuery,
                      ...prev.slice(index + 1),
                    ];
                    setValue({ ...value, queries: newQueries });
                  }}
                />
              </div>
            ))}
            <div className="w-full py-2">
              <Button
                onClick={() => {
                  const prev = value.queries;
                  const newQueries = [...prev, ""];
                  setValue({ ...value, queries: newQueries });
                }}
                variant="secondary"
              >
                <PlusCircle className="size-4" />
                افزودن کوئری
              </Button>
            </div>

            <div className="w-full flex items-center justify-end">
              <Button
                className="w-32"
                onClick={() => onNewPanel(value)}
                variant="default"
              >
                ایجاد
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

PanelForm.displayName = "PanelForm";

export default PanelForm;
