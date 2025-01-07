"use client";

import { useDatabaseQueries } from "@/hooks/use-panel";
import SeriesPanel from "./series-panel";
import { Skeleton } from "../ui/skeleton";
import { Panel } from "@/types/panel";

interface MainProps {
  panels: Panel[];
  onEditPanelClick: (panel: Panel) => void;
}

const Main = ({ panels, onEditPanelClick }: MainProps) => {
  const queryResults = useDatabaseQueries(
    "influx",
    panels.map((panel) => panel.queries)
  );
  return (
    <main className="absolute w-full px-6 flex-1 grid grid-cols-2 place-items-start gap-4 pt-20 pb-10 bg-slate-200 min-h-screen">
      {queryResults &&
        queryResults.map((panelQueryResults, index) =>
          panelQueryResults.data ? (
            <SeriesPanel
              key={panels[index].id}
              panel={panels[index]}
              panelData={panelQueryResults.data.filter((item) => item !== null)}
              onEditButtonClick={() => onEditPanelClick({ ...panels[index] })}
            />
          ) : (
            <Skeleton key={panels[index].id} className="w-full h-96" />
          )
        )}
    </main>
  );
};

export default Main;
