"use client";

import DashboardHeader from "@/components/dashboard-header";
import PanelCards from "@/components/panels/panel-cards";
import PanelForm, { PanelFormHandle } from "@/components/panels/panel-form";
import Variables, { VariablesHandle } from "@/components/variables";
import { Variable } from "@/schemas/variable";
import { Panel } from "@/types/panel";
import { generateEmptyPanel, generateId } from "@/utils/random";
import { useRef, useState } from "react";

export default function Home() {
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
      />
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
