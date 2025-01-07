"use client";

import AddPanel from "@/components/panels/add-panel";
import SeriesPanel from "@/components/panels/series-panel";
import { Skeleton } from "@/components/ui/skeleton";
import { useDatabaseQueries } from "@/hooks/use-panel";
import { Panel } from "@/types/panel";
import { generateId } from "@/utils/random";
import { useState } from "react";

export default function Home() {
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
  const queryResults = useDatabaseQueries(
    "influx",
    panels.map((panel) => panel.queries)
  );

  return (
    <>
      <header
        className="h-14 bg-white shadow-md border-b flex items-center px-4 font-bold text-lg fixed top-0 left-0 right-0 z-10"
        dir="rtl"
      >
        <div className="">پروژه مانیتورینگ (امیرمحمد کریمی)</div>
        <div className="flex-1" />
        <AddPanel
          onNewPanel={(newPanel) => setPanels((prev) => [...prev, newPanel])}
        />
      </header>
      <main className="absolute w-full px-6 flex-1 grid grid-cols-2 place-items-start gap-4 pt-20 pb-10 bg-slate-200 min-h-screen">
        {queryResults &&
          queryResults.map((panelQueryResults, index) =>
            panelQueryResults.data ? (
              <SeriesPanel
                key={panels[index].id}
                panel={panels[index]}
                panelData={panelQueryResults.data.filter(
                  (item) => item !== null
                )}
              />
            ) : (
              <Skeleton key={panels[index].id} className="w-full h-96" />
            )
          )}
      </main>
    </>
  );
}
