"use client";

import { Variable } from "@/schemas/variable";
import { PlusCircle, TrashIcon } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import AutogrowingTextarea from "./ui/autogrowing-textarea";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import DropdownButton from "./ui/dropdown-button";

interface VariablesProps {
  onSubmit: (v: Variable[]) => void;
  value: Variable[];
}

export interface VariablesHandle {
  setIsOpen: (open: boolean) => void;
}

const Variables = forwardRef<VariablesHandle, VariablesProps>(
  ({ onSubmit, value }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [variables, setVariables] = useState<Variable[]>(value);
    
    useImperativeHandle(ref, () => ({ setIsOpen }));

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[70vh] overflow-y-auto" dir="rtl">
          <DialogTitle className="w-full text-center">متغیرها</DialogTitle>
          <h3 className="border-b font-bold">انتخاب مقادیر متغیر‌ها</h3>
          <h3 className="mt-4 border-b font-bold">ویرایش و افزودن متغیر‌ها</h3>
          <div className="w-full flex flex-col gap-2">
            {variables.map(({ name, query }, index) => (
              <div
                className="w-full flex flex-row-reverse items-center gap-2"
                key={index}
              >
                <DropdownButton
                  items={[
                    {
                      title: "حذف",
                      icon: TrashIcon,
                      onClick: () =>
                        setVariables((prev) =>
                          prev.filter((v, j) => j !== index)
                        ),
                      className:
                        "text-red-600 hover:text-red-500 cursor-pointer",
                    },
                  ]}
                />
                <AutogrowingTextarea
                  className="w-32 font-sans text-sm"
                  value={name}
                  minRows={1}
                  maxRows={5}
                  placeholder="نام متغیر"
                  onChange={(v) => {
                    const prev = variables;
                    const newQueries = [
                      ...prev.slice(0, index),
                      { name: v, query },
                      ...prev.slice(index + 1),
                    ];
                    setVariables(newQueries);
                  }}
                />
                <AutogrowingTextarea
                  className="flex-1 font-sans text-sm"
                  value={query}
                  minRows={1}
                  maxRows={5}
                  placeholder="کوئری"
                  onChange={(newQuery) => {
                    const prev = variables;
                    const newQueries = [
                      ...prev.slice(0, index),
                      { name, query: newQuery },
                      ...prev.slice(index + 1),
                    ];
                    setVariables(newQueries);
                  }}
                />
              </div>
            ))}
            <div className="w-full py-2">
              <Button
                onClick={() => {
                  setVariables((prev) => [...prev, { name: "", query: "" }]);
                }}
                variant="secondary"
              >
                <PlusCircle className="size-4" />
                افزودن متغیر
              </Button>
            </div>

            <div className="w-full flex items-center justify-end">
              <Button
                className="w-32"
                onClick={() =>
                  onSubmit(
                    value.filter(
                      (v) =>
                        v.name.trim().length > 0 && v.query.trim().length > 0
                    )
                  )
                }
                variant="default"
              >
                تأیید
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

Variables.displayName = "Variables";

export default Variables;
