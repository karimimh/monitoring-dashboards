"use client";

import Main from "@/components/panels/main";
import PanelForm, { PanelFormHandle } from "@/components/panels/panel-form";
import { Button } from "@/components/ui/button";
import { EMPTY_PANEL } from "@/constants/panel";
import { Panel } from "@/types/panel";
import { generateId } from "@/utils/random";
import { PlusIcon } from "lucide-react";
import { useRef, useState } from "react";

export default function Home() {
  const panelFormRef = useRef<PanelFormHandle>(null);
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
      <header
        className="h-14 bg-white shadow-md border-b flex items-center px-4 font-bold text-lg fixed top-0 left-0 right-0 z-10"
        dir="rtl"
      >
        <div className="">پروژه مانیتورینگ (امیرمحمد کریمی)</div>
        <div className="flex-1" />
        <Button
          className="flex items-center"
          onClick={() => {
            panelFormRef.current?.setPanelForm(EMPTY_PANEL);
            panelFormRef.current?.setIsOpen(true);
          }}
          variant="outline"
        >
          <PlusIcon className="size-4" />
          <span>افزودن پنل</span>
        </Button>
      </header>
      <Main
        panels={panels}
        onEditPanelClick={(p) => {
          panelFormRef.current?.setPanelForm(p);
          panelFormRef.current?.setIsOpen(true);
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
          panelFormRef.current?.setPanelForm(EMPTY_PANEL);
        }}
      />
    </>
  );
}
