"use client";

import { Panel } from "@/types/panel";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface SeriesPanelChartProps {
  panel: Panel;
  data: [string, number | null][][];
  colors: string[];
  paddingPercentage?: number;
}

const SeriesPanelChart = ({
  panel,
  data,
  colors,
  paddingPercentage = 10,
}: SeriesPanelChartProps) => {
  const transformedData = useMemo(() => {
    const result = [];
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    const mean = Array(data.length).fill(0);
    for (let i = 0; i < data[0].length; i++) {
      const time = new Date(data[0][i][0]).toLocaleString("fa-IR", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      const valuesRecord: { [key: string]: number | null } = {};
      for (let j = 0; j < data.length; j++) {
        valuesRecord[`value${j}`] = data[j][i][1];
        if (data[j][i][1] !== null) {
          min = Math.min(min, data[j][i][1] as number);
          max = Math.max(max, data[j][i][1] as number);
          mean[j] += data[j][i][1] as number;
        }
      }
      result.push({ date: time, ...valuesRecord });
    }
    return {
      result,
      min,
      max,
      mean: mean.map((value) => value / result.length),
    };
  }, [data]);

  const padding =
    ((transformedData.max - transformedData.min) * paddingPercentage) / 100.0;

  const extractQueryName = (query: string) => {
    const match = query.match(/SELECT\s+(.+?)\s+FROM/i);
    return match ? match[1] : "---";
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={transformedData.result}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" fontSize={10} />
            <YAxis
              domain={[
                parseFloat((transformedData.min - padding).toFixed(2)),
                parseFloat((transformedData.max + padding).toFixed(2)),
              ]}
              tickFormatter={(value) => value.toFixed(0)}
            />
            <Tooltip />
            {data.map((_, index) => {
              return (
                <Area
                  key={index}
                  type="linear"
                  dataKey={`value${index}`}
                  stroke={colors[index]}
                  fill={colors[index]}
                  fillOpacity={0.3}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full pl-10 flex justify-stretch">
        <table className="w-full text-left text-xs">
          <thead className="border-b">
            <tr>
              <th>کوئری</th>
              <th>کمینه</th>
              <th>بیشینه</th>
              <th>متوسط</th>
            </tr>
          </thead>
          <tbody>
            {data.map((_, index) => (
              <tr
                key={index}
                style={{ color: colors[index], borderColor: colors[index] }}
              >
                <td className="border-r truncate">
                  {extractQueryName(panel.queries[index])}
                </td>
                <td>{transformedData.min.toFixed(2)}</td>
                <td>{transformedData.max.toFixed(2)}</td>
                <td>{transformedData.mean[index].toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeriesPanelChart;
