"use client";

import { useAllDashboards, useCreateDashboard } from "@/hooks/use-dashboard";
import { Panel } from "@/types/panel";
import { PlusIcon, SaveIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import DashboardForm from "./dashboard-form";
import DateRangePicker from "./date-range-picker";
import { PanelFormHandle } from "./panels/panel-form";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { VariablesHandle } from "./variables";

interface DashboardHeaderProps {
  fromDate: number | undefined;
  setFromDate?: (fromDate: number | undefined) => void;
  setPanels?: React.Dispatch<React.SetStateAction<Panel[]>>;
  toDate: number | undefined;
  setToDate?: (toDate: number | undefined) => void;
  panelFormRef?: React.RefObject<PanelFormHandle | null>;
  variablesRef?: React.RefObject<VariablesHandle | null>;
  selectedDashboardId?: string;
  setSelectedDashboardId: (v: string) => void;
}

const DashboardHeader = ({
  fromDate,
  panelFormRef,
  setFromDate,
  setPanels,
  toDate,
  setToDate,
  variablesRef,
  selectedDashboardId,
  setSelectedDashboardId,
}: DashboardHeaderProps) => {
  const pathname = usePathname();
  // const { mutate: createDashboard } = useCreateDashboard();
  // const { data: allDashboards } = useAllDashboards();

  const replaceQueryDates = useCallback(
    (query: string): string => {
      if (!/time >= \d+ms and time <= \d+ms/.test(query)) {
        if (/GROUP BY/.test(query)) {
          query = query.replace(
            /GROUP BY/,
            `time >= ${fromDate}ms and time <= ${toDate}ms GROUP BY`
          );
        } else {
          query = `${query} time >= ${fromDate}ms and time <= ${toDate}ms GROUP BY time(1m) fill(null)`;
        }
      }
      return query.replace(
        /time >= \d+ms and time <= \d+ms/g,
        `time >= ${fromDate}ms and time <= ${toDate}ms`
      );
    },
    [fromDate, toDate]
  );
  const [isOpen, setIsOpen] = useState(false);
  const headerTag = document.getElementById("header");

  return headerTag
    ? createPortal(
        <>
          {pathname === "/" ? (
            <>
              {/* <Select
                dir="rtl"
                onValueChange={(v) => {
                  setSelectedDashboardId(v as string);
                  setPanels?.((prev) =>
                    prev.map((panel) => ({
                      ...panel,
                      queries: panel.queries.map(replaceQueryDates),
                    }))
                  );
                }}
                value={
                  allDashboards.find((db) => db.id === selectedDashboardId)
                    ?.name
                }
              >
                <SelectTrigger className="w-36 h-10">
                  {allDashboards?.find((db) => db.id === selectedDashboardId)
                    ?.name ?? "انتخاب کنید ..."}
                </SelectTrigger>
                <SelectContent>
                  {allDashboards?.map((db) => (
                    <SelectItem key={db.id} value={db.id}>
                      {db.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
              {/* <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center" variant="outline">
                    <PlusIcon className="size-4" />
                    <span>افزودن داشبورد</span>
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="max-h-[70vh] overflow-y-auto"
                  dir="rtl"
                >
                  <DialogTitle className="w-full text-center">
                    افزودن داشبورد
                  </DialogTitle>
                  <DashboardForm
                    onSubmit={(db) => {
                      setIsOpen(false);
                      // createDashboard(db);
                      setSelectedDashboardId(db.id);
                    }}
                  />
                </DialogContent>
              </Dialog> */}
              {/* {selectedDashboardId && (
                <Button
                  className="flex items-center"
                  onClick={() => {}}
                  variant="outline"
                >
                  <SaveIcon className="size-4" />
                  <span>ذخیره داشبورد</span>
                </Button>
              )} */}
            </>
          ) : null}
          <div className="flex-1" />
          {pathname === "/" ? (
            <>
              <DateRangePicker
                fromDate={fromDate}
                onChange={(fromDate, toDate) => {
                  setFromDate?.(fromDate);
                  setToDate?.(toDate);
                  setPanels?.((prev) =>
                    prev.map((panel) => ({
                      ...panel,
                      queries: panel.queries.map(replaceQueryDates),
                    }))
                  );
                }}
                toDate={toDate}
              />
              {/* <Button
                className="flex items-center"
                onClick={() => {
                  variablesRef?.current?.setIsOpen(true);
                }}
                variant="outline"
              >
                <VariableIcon className="size-4" />
                <span>متغیرها</span>
              </Button> */}
            </>
          ) : null}
        </>,
        headerTag
      )
    : null;
};

export default DashboardHeader;
