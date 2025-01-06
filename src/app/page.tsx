"use client";

import SeriesPanel from "@/components/panels/series-panel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQueryPanel } from "@/hooks/use-panel";
import { PlusIcon } from "lucide-react";
import { useMemo } from "react";

export default function Home() {
  const { data: panelData1 } = useQueryPanel(
    "influx",
    `SELECT mean("load1") FROM "system" WHERE "host" =~ /^docker-telegraf$/ AND time >= 1736102864429ms and time <= 1736189234429ms GROUP BY time(1m) fill(null)`
  );
  const { data: panelData2 } = useQueryPanel(
    "influx",
    `SELECT mean("load5") FROM "system" WHERE "host" =~ /^docker-telegraf$/ AND time >= 1736102864429ms and time <= 1736189234429ms GROUP BY time(1m) fill(null)`
  );
  const { data: panelData3 } = useQueryPanel(
    "influx",
    `SELECT mean("load15") FROM "system" WHERE "host" =~ /^docker-telegraf$/ AND time >= 1736102924632ms and time <= 1736189294634ms GROUP BY time(1m) fill(null)`
  );

  const panelData = useMemo(
    () =>
      [panelData1, panelData2, panelData3].filter((item) => item !== undefined),
    [panelData1, panelData2, panelData3]
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
          <DialogContent className="h-96">
            <DialogTitle>افزودن پنل</DialogTitle>
          </DialogContent>
        </Dialog>
      </header>
      <main className="absolute w-full px-6 flex-1 grid grid-cols-2 place-items-center gap-4 pt-20 bg-slate-200 min-h-screen">
        <SeriesPanel panelData={panelData} />
      </main>
    </>
  );
}
