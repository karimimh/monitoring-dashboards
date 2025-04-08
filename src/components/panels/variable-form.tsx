"use client";

import { UseVariablesResult } from "@/hooks/use-variable";
import { Variable } from "@/schemas/variable";
import { TrashIcon } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import AutogrowingTextarea from "../ui/autogrowing-textarea";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";

interface VariablFormProps {
  onSubmit: (variable: Variable) => void;
  variables: Variable[];
  onVariablesChange?: (variables: Variable[]) => void;
  queryResults: UseVariablesResult;
  onVariableValueSelected: (
    variableName: string,
    value: string | number | null
  ) => void;
}

export interface VariableFormHandle {
  setIsOpen: (open: boolean) => void;
  setVariableForm: (panel: Variable) => void;
}

const VariableForm = forwardRef<VariableFormHandle, VariablFormProps>(
  (
    {
      onSubmit,
      variables,
      onVariablesChange,
      queryResults,
      onVariableValueSelected,
    },
    ref
  ) => {
    const [value, setValue] = useState<Variable>({
      name: "",
      query: "",
    });

    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({ setIsOpen, setVariableForm: setValue }));
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[70vh] overflow-y-auto" dir="rtl">
          <DialogTitle className="w-full text-center">متغیرها</DialogTitle>
          <div className="w-full flex flex-col gap-2">
            <h3 className="text-black text-base font-bold">افزودن متغیر</h3>
            <div className="w-full flex items-center gap-2">
              <div className="w-32">عنوان متغیر</div>
              <Input
                className="flex-1 h-7"
                type="text"
                value={value.name}
                onChange={(e) => setValue({ ...value, name: e.target.value })}
              />
            </div>
            <div className="w-full flex items-center gap-2">
              <div className="w-32">کوئری</div>
              <AutogrowingTextarea
                className="flex-1 h-7 font-sans text-xs"
                value={value.query}
                minRows={4}
                maxRows={5}
                onChange={(newQuery) => {
                  setValue({ ...value, query: newQuery });
                }}
              />
            </div>

            <div className="w-full flex items-center justify-end">
              <Button
                className="w-32"
                onClick={() => onSubmit(value)}
                variant="default"
              >
                ایجاد
              </Button>
            </div>
            <h3 className="text-black text-base font-bold">لیست متغیرها</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-2 py-1">
                    عنوان متغیر
                  </th>
                  <th className="border border-gray-300 px-2 py-1">کوئری</th>
                  <th className="border border-gray-300 px-2 py-1">مقدار</th>
                  <th className="border border-gray-300 px-2 py-1">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {variables.map((variable, index) => (
                  <tr key={variable.name}>
                    <td className="border border-gray-300 px-2 py-1">
                      {variable.name}
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      {variable.query}
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      {/* show a dropdown with the values of the query */}
                      {(queryResults[index].data?.results?.at(0)?.series
                        .length ?? 0) > 0 && (
                        <select
                          className="w-32 border truncate overflow-ellipsis h-7"
                          onChange={(e) => {
                            const newVariables = variables.map((item, i) => {
                              if (i === index) {
                                return {
                                  ...item,
                                  value: e.target.value,
                                };
                              }
                              return item;
                            });
                            onVariablesChange?.(newVariables);
                            onVariableValueSelected(
                              variable.name,
                              e.target.value
                            );
                          }}
                          value={variable.value ?? undefined}
                        >
                          {queryResults[index]?.data?.results
                            ?.at(0)
                            ?.series.map(({ values }) =>
                              values.map((value, j) =>
                                value.length >= 2 && value[1] ? (
                                  <option key={j} value={value[1]}>
                                    {value[1]}
                                  </option>
                                ) : null
                              )
                            )}
                        </select>
                      )}
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <Button
                        variant="destructive"
                        onClick={() => {
                          const newVariables = variables.filter(
                            (item) => item.name !== variable.name
                          );
                          onVariablesChange?.(newVariables);
                        }}
                      >
                        <TrashIcon className="size-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

VariableForm.displayName = "PanelForm";

export default VariableForm;
