"use client";

import AddPanel from "@/components/panels/add-panel";
import SeriesPanel from "@/components/panels/series-panel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllPanelQueries } from "@/hooks/use-panel";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [panels, setPanels] = useState<{ title: string; queries: string[] }[]>([
    {
      title: "حافظه",
      queries: [
        `SELECT mean("load1") FROM "system" WHERE "host" =~ /^docker-telegraf$/ AND time >= 1736102864429ms and time <= 1736189234429ms GROUP BY time(1m) fill(null)`,
        `SELECT mean("load5") FROM "system" WHERE "host" =~ /^docker-telegraf$/ AND time >= 1736102864429ms and time <= 1736189234429ms GROUP BY time(1m) fill(null)`,
        `SELECT mean("load15") FROM "system" WHERE "host" =~ /^docker-telegraf$/ AND time >= 1736102924632ms and time <= 1736189294634ms GROUP BY time(1m) fill(null)`,
      ],
    },
  ]);
  const { data: queryResults } = useAllPanelQueries(
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

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center" variant="outline">
              <PlusIcon className="size-4" />
              <span>افزودن پنل</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[70vh] overflow-y-auto" dir="rtl">
            <DialogTitle className="w-full text-center">افزودن پنل</DialogTitle>
            <AddPanel
              onNewPanel={(newPanel) =>
                setPanels((prev) => [...prev, newPanel])
              }
            />
          </DialogContent>
        </Dialog>
      </header>
      <main className="absolute w-full px-6 flex-1 grid grid-cols-2 place-items-center gap-4 pt-20 bg-slate-200 min-h-screen">
        {queryResults?.map((panelData, index) => (
          <SeriesPanel key={index} panelData={panelData} />
        )) ?? <Skeleton className="w-full h-full" />}
      </main>
    </>
  );
}
