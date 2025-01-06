"use client";

import { PanelType } from "@/schemas/panel";
import { getRandomColor } from "@/utils/color";
import { useEffect, useMemo, useState } from "react";
import Panel from "./panel";
import SeriesPanelChart from "./series-panel-chart";
import { Skeleton } from "../ui/skeleton";

interface SeriesPanelProps {
  panelData: PanelType[];
}

const SeriesPanel = ({ panelData }: SeriesPanelProps) => {
  const panelName =
    panelData.at(0)?.results.at(0)?.series.at(0)?.name ??
    "PANEL NAME NOT FOUND";
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const generatedColors = panelData
      .at(0)
      ?.results.flatMap((panelData) =>
        panelData.series.map(() => getRandomColor())
      );
    if (generatedColors) setColors(generatedColors);
  }, [panelData]);

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
    <Panel
      childContainerClassName="p-2"
      className="w-full h-96"
      title={panelName}
    >
      {panelData.length > 0 ? (
        <SeriesPanelChart
          colors={colors}
          data={panelValues}
          paddingPercentage={10}
        />
      ) : (
        <Skeleton className="w-full h-full" />
      )}
    </Panel>
  );
};

export default SeriesPanel;
