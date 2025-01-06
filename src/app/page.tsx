"use client";

import SeriesPanel from "@/components/panels/series-panel";
import { Skeleton } from "@/components/ui/skeleton";
import { SAMPLE_PANEL } from "@/constants/panel";

export default function Home() {
  // const { data } = usePanel();

  // console.log(data);

  const data = { ...SAMPLE_PANEL };
  // data.results[0].series = SAMPLE_PANEL.results[0].series.concat(
  //   ...SAMPLE_PANEL.results[0].series
  // );
  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full bg-slate-100">
      <header className="w-full h-14 bg-white shadow-md border-b"></header>
      <main className="w-full px-6 flex-1 grid grid-cols-2 place-items-center gap-4">
        {data ? (
          <SeriesPanel panel={data} />
        ) : (
          <Skeleton className="w-64 h-20" />
        )}
        {data ? (
          <SeriesPanel panel={data} />
        ) : (
          <Skeleton className="w-64 h-20" />
        )}
      </main>
    </div>
  );
}
