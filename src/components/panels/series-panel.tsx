"use client";

import { PanelApi } from "@/schemas/panel";
import { Panel as PanelType } from "@/types/panel";
import { useMemo } from "react";
import { Skeleton } from "../ui/skeleton";
import PanelCard from "./panel-card";
import SeriesPanelChart from "./series-panel-chart";

interface SeriesPanelProps {
  panel: PanelType;
  panelData: PanelApi[];
  onEditButtonClick?: () => void;
}

const SeriesPanel = ({
  panelData,
  panel,
  onEditButtonClick,
}: SeriesPanelProps) => {
  const panelValues = useMemo(() => {
    const result = [];
    for (let i = 0; i < panelData.length; i++) {
      const panelPlotItem = panelData[i];
      const data = panelPlotItem.results[0].series[0].values;
      result.push(data);
    }
    return result;
  }, [panelData]);

  return (
    <PanelCard
      childContainerClassName="p-2"
      className="w-full h-96"
      title={panel.title}
      onEditButtonClick={onEditButtonClick}
    >
      {panelData.length > 0 ? (
        <SeriesPanelChart
          colors={panel.colors}
          data={panelValues}
          paddingPercentage={10}
        />
      ) : (
        <Skeleton className="w-full h-full" />
      )}
    </PanelCard>
  );
};

export default SeriesPanel;
