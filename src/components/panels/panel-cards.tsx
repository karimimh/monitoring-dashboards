"use client";

import { useDatabaseQueries } from "@/hooks/use-query";
import { Panel } from "@/types/panel";
import { Skeleton } from "../ui/skeleton";
import SeriesPanel from "./series-panel";

interface PanelCardsProps {
  panels: Panel[];
  onEditPanelClick: (panel: Panel) => void;
  onDeleteButtonClick: (panel: Panel) => void;
  variableValues: {
    name: string;
    values: (string | number | null)[];
  }[];
  selectedVariableValues: {
    name: string;
    values: (string | number | null);
  }[];
}

const PanelCards = ({
  panels,
  onEditPanelClick,
  onDeleteButtonClick,
  variableValues,selectedVariableValues
}: PanelCardsProps) => {
  const queryResults = useDatabaseQueries(
    "metrics",
    panels.map((panel) => panel.query),
    variableValues,
    selectedVariableValues
  );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 place-items-start gap-4 pt-16 pb-10 px-6">
      {queryResults &&
        queryResults.map((panelQueryResults, index) =>
          panelQueryResults.data ? (
            <SeriesPanel
              key={index}
              panel={panels[index]}
              panelData={panelQueryResults.data.filter((item) => item !== null)}
              onEditButtonClick={() => onEditPanelClick({ ...panels[index] })}
              onDeleteButtonClick={() => onDeleteButtonClick(panels[index])}
            />
          ) : (
            <Skeleton key={index} className="w-full h-96" />
          )
        )}
    </div>
  );
};

export default PanelCards;
