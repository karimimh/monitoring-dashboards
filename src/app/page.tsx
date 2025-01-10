"use client";

import AppSidebar, { AppSidebarHandle } from "@/components/app-sidebar";
import DateRangePicker from "@/components/date-range-picker";
import PanelCards from "@/components/panels/panel-cards";
import PanelForm, { PanelFormHandle } from "@/components/panels/panel-form";
import { Button } from "@/components/ui/button";
import Variables, { VariablesHandle } from "@/components/variables";
import { Variable } from "@/schemas/variable";
import { Panel } from "@/types/panel";
import { generateEmptyPanel, generateId } from "@/utils/random";
import { MenuIcon, PlusIcon, VariableIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";

export default function Home() {
  const panelFormRef = useRef<PanelFormHandle>(null);
  const variablesRef = useRef<VariablesHandle>(null);
  const sidebarRef = useRef<AppSidebarHandle>(null);
  const [fromDate, setFromDate] = useState<number | undefined>(1736102864429);
  const [toDate, setToDate] = useState<number | undefined>(1736189234429);
  const [variables, setVariables] = useState<Variable[]>([]);
  const [panels, setPanels] = useState<Panel[]>([
    {
      title: "حافظه",
      queries: [
        `SELECT mean("load1") FROM "system" WHERE "host" =~ /^docker-telegraf$/ AND time >= 1736102864429ms and time <= 1736189234429ms GROUP BY time(1m) fill(null)`,
        `SELECT mean("load5") FROM "system" WHERE "host" =~ /^docker-telegraf$/ AND time >= 1736102864429ms and time <= 1736189234429ms GROUP BY time(1m) fill(null)`,
        `SELECT mean("load15") FROM "system" WHERE "host" =~ /^docker-telegraf$/ AND time >= 1736102924632ms and time <= 1736189294634ms GROUP BY time(1m) fill(null)`,
      ],
      colors: ["red", "green", "blue"],
      id: generateId(),
    },
  ]);

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
    <>
      <header
        className="h-14 bg-white shadow-md gap-2 border-b flex items-center px-4 font-bold text-lg fixed top-0 left-0 right-0 z-10"
        dir="rtl"
        id="header"
      >
        <button onClick={() => sidebarRef.current?.toggleSidebar()}>
          <MenuIcon className="size-6" />
        </button>
        <div className="mr-2">پروژه دانا</div>
        <div className="flex-1" />
        <DateRangePicker
          fromDate={fromDate}
          onChange={(fromDate, toDate) => {
            setFromDate(fromDate);
            setToDate(toDate);
            setPanels((prev) =>
              prev.map((panel) => ({
                ...panel,
                queries: panel.queries.map(replaceQueryDates),
              }))
            );
          }}
          toDate={toDate}
        />
        <Button
          className="flex items-center"
          onClick={() => {
            variablesRef.current?.setIsOpen(true);
          }}
          variant="outline"
        >
          <VariableIcon className="size-4" />
          <span>متغیرها</span>
        </Button>

        <Button
          className="flex items-center"
          onClick={() => {
            panelFormRef.current?.setPanelForm(generateEmptyPanel());
            panelFormRef.current?.setIsOpen(true);
          }}
          variant="outline"
        >
          <PlusIcon className="size-4" />
          <span>افزودن پنل</span>
        </Button>
      </header>
      <AppSidebar ref={sidebarRef} />

      <PanelCards
        panels={panels}
        variables={variables}
        onEditPanelClick={(p) => {
          panelFormRef.current?.setPanelForm(p);
          panelFormRef.current?.setIsOpen(true);
        }}
        onDeleteButtonClick={(p) => {
          const index = panels.findIndex((item) => item.id === p.id);
          if (index >= 0) {
            setPanels((prev) => [
              ...prev.slice(0, index),
              ...prev.slice(index + 1),
            ]);
          }
        }}
      />
      <Variables
        ref={variablesRef}
        value={variables}
        onSubmit={(newVariables) => {
          variablesRef.current?.setIsOpen(false);
          setVariables(newVariables);
        }}
      />
      <PanelForm
        ref={panelFormRef}
        onSubmit={(panelForm: Panel) => {
          const existingPanelIndex = panels.findIndex(
            (item) => item.id === panelForm.id
          );
          if (existingPanelIndex >= 0) {
            setPanels((prev) => [
              ...prev.slice(0, existingPanelIndex),
              panelForm,
              ...prev.slice(existingPanelIndex + 1),
            ]);
          } else {
            setPanels((prev) => [...prev, panelForm]);
          }
          panelFormRef.current?.setIsOpen(false);
          panelFormRef.current?.setPanelForm(generateEmptyPanel());
        }}
      />
    </>
  );
}
