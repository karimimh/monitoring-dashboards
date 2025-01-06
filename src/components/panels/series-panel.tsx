"use client";

import { PanelType } from "@/schemas/panel";
import Panel from "./panel";
import SeriesPanelChart from "./series-panel-chart";
import { getRandomColor } from "@/utils/color";
import { useEffect, useState } from "react";

interface SeriesPanelProps {
  panel: PanelType;
}

const SeriesPanel = ({ panel }: SeriesPanelProps) => {
  const panelName =
    panel.results.at(0)?.series.at(0)?.name ?? "PANEL NAME NOT FOUND";
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const generatedColors = panel.results.flatMap((panelData) =>
      panelData.series.map(() => getRandomColor())
    );
    setColors(generatedColors);
  }, [panel]);
  return (
    <Panel childContainerClassName="px-2" className="w-full h-96" title={panelName}>
      {panel.results.map((panelData) => {
        const data = panelData.series.map((item) => item.values);
        return (
          <SeriesPanelChart
            key={panelName}
            colors={colors}
            data={data}
            paddingPercentage={10}
          />
        );
      })}
    </Panel>
  );
};

export default SeriesPanel;
