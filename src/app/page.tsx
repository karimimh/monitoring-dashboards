"use client";

import Dashboard from "@/components/dashboard";
import DashboardHeader from "@/components/dashboard-header";
import { PanelFormHandle } from "@/components/panels/panel-form";
import { VariablesHandle } from "@/components/variables";
import { useDashboard } from "@/hooks/use-dashboard";
import { Variable } from "@/schemas/variable";
import { Panel } from "@/types/panel";
import { generateId } from "@/utils/random";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [selectedDashboardId, setSelectedDashboardId] = useState<string>("");
  const panelFormRef = useRef<PanelFormHandle>(null);
  const variablesRef = useRef<VariablesHandle>(null);
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


  return (
    <>
      <DashboardHeader
        fromDate={fromDate}
        setFromDate={setFromDate}
        setPanels={setPanels}
        panelFormRef={panelFormRef}
        toDate={toDate}
        setToDate={setToDate}
        variablesRef={variablesRef}
        selectedDashboardId={selectedDashboardId}
        setSelectedDashboardId={(id) => {
          setSelectedDashboardId(id);
        }}
      />
      <Dashboard
        setPanels={setPanels}
        panelFormRef={panelFormRef}
        variablesRef={variablesRef}
        variables={variables}
        panels={panels}
        setVariables={setVariables}
        selectedDashboardId={selectedDashboardId}
      />
    </>
  );
}
