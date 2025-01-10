"use client";

import { useDatabaseQueries } from "@/hooks/use-panel";
import SeriesPanel from "./series-panel";
import { Skeleton } from "../ui/skeleton";
import { Panel } from "@/types/panel";
import { Variable } from "@/schemas/variable";

interface PanelCardsProps {
  panels: Panel[];
  variables: Variable[];
  onEditPanelClick: (panel: Panel) => void;
  onDeleteButtonClick: (panel: Panel) => void;
}

const PanelCards = ({
  panels,
  onEditPanelClick,
  onDeleteButtonClick,
  variables,
}: PanelCardsProps) => {
  const queryResults = useDatabaseQueries(
    "influx",
    panels.map((panel) => panel.queries),
    variables
  );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 place-items-start gap-4 pt-6 pb-10 px-6">
      {queryResults &&
        queryResults.map((panelQueryResults, index) =>
          panelQueryResults.data ? (
            <SeriesPanel
              key={panels[index].id}
              panel={panels[index]}
              panelData={panelQueryResults.data.filter((item) => item !== null)}
              onEditButtonClick={() => onEditPanelClick({ ...panels[index] })}
              onDeleteButtonClick={() => onDeleteButtonClick(panels[index])}
            />
          ) : (
            <Skeleton key={panels[index].id} className="w-full h-96" />
          )
        )}
    </div>
  );
};

export default PanelCards;
