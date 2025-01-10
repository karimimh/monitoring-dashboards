"use client";

import { Panel } from "@/types/panel";
import { generateEmptyPanel } from "@/utils/random";
import { PlusIcon, SaveIcon, VariableIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import DateRangePicker from "./date-range-picker";
import { PanelFormHandle } from "./panels/panel-form";
import { Button } from "./ui/button";
import { VariablesHandle } from "./variables";
import { createPortal } from "react-dom";
import { useCreateDashboard } from "@/hooks/use-dashboard";

interface DashboardHeaderProps {
  fromDate: number | undefined;
  setFromDate?: (fromDate: number | undefined) => void;
  setPanels?: React.Dispatch<React.SetStateAction<Panel[]>>;
  toDate: number | undefined;
  setToDate?: (toDate: number | undefined) => void;
  panelFormRef?: React.RefObject<PanelFormHandle | null>;
  variablesRef?: React.RefObject<VariablesHandle | null>;
}

const DashboardHeader = ({
  fromDate,
  panelFormRef,
  setFromDate,
  setPanels,
  toDate,
  setToDate,
  variablesRef,
}: DashboardHeaderProps) => {
  const pathname = usePathname();
  const { mutate: createDashboard } = useCreateDashboard();

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
  const headerTag = document.getElementById("header");
  return headerTag
    ? createPortal(
        <>
          {pathname === "/" ? (
            <>
              <Button
                className="flex items-center"
                onClick={() => {
                  panelFormRef?.current?.setPanelForm(generateEmptyPanel());
                  panelFormRef?.current?.setIsOpen(true);
                }}
                variant="outline"
              >
                <PlusIcon className="size-4" />
                <span>افزودن پنل</span>
              </Button>
              <Button
                className="flex items-center"
                onClick={() => {}}
                variant="outline"
              >
                <SaveIcon className="size-4" />
                <span>ذخیره داشبورد</span>
              </Button>
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
