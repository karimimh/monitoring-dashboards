"use client";

import { useSaveDashboard } from "@/hooks/use-dashboard";
import { Dashboard } from "@/types/dashboard";
import { Panel } from "@/types/panel";
import { generateEmptyPanel } from "@/utils/random";
import { PlusIcon, SaveIcon } from "lucide-react";
import { useCallback } from "react";
import DateRangePicker from "../date-range-picker";
import { PanelFormHandle } from "../panels/panel-form";
import { Button } from "../ui/button";

interface DashboardHeaderProps {
  fromDate: number | undefined;
  setFromDate?: (fromDate: number | undefined) => void;
  setPanels?: React.Dispatch<React.SetStateAction<Panel[]>>;
  panels: Panel[];
  toDate: number | undefined;
  setToDate?: (toDate: number | undefined) => void;
  panelFormRef?: React.RefObject<PanelFormHandle | null>;
  dashboard: Dashboard;
}

const DashboardHeader = ({
  fromDate,
  panelFormRef,
  setFromDate,
  setPanels,
  toDate,
  setToDate,
  dashboard,
  panels,
}: DashboardHeaderProps) => {
  // const { mutate: createDashboard } = useCreateDashboard();
  // const { data: allDashboards } = useAllDashboards();
  const { mutate: saveDashboard } = useSaveDashboard();

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

  return (
    <div
      className="flex items-center gap-4 h-14 px-4 border-b border-black"
      dir="rtl"
    >
      <Button
        className="flex items-center gap-2"
        onClick={() => {
          panelFormRef?.current?.setPanelForm(generateEmptyPanel());
          panelFormRef?.current?.setIsOpen(true);
        }}
        dir="rtl"
        variant="outline"
      >
        <PlusIcon className="size-4" />
        <span>افزودن پنل</span>
      </Button>
      <Button
        className="flex items-center"
        onClick={() =>
          saveDashboard({
            id: dashboard.id,
            name: dashboard.name,
            panels,
            variables: [],
          })
        }
        variant="outline"
      >
        <SaveIcon className="size-4" />
        <span>ذخیره داشبورد</span>
      </Button>
      <div className="flex-1" />
      <DateRangePicker
        fromDate={fromDate}
        onChange={(fromDate, toDate) => {
          setFromDate?.(fromDate);
          setToDate?.(toDate);
          setPanels?.((prev) =>
            prev.map((panel) => ({
              ...panel,
              query: panel.query.map(replaceQueryDates),
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
    </div>
  );
};

export default DashboardHeader;
