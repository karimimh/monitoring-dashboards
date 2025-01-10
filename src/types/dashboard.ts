import { Panel } from "./panel";

export type Dashboard = {
  id: number;
  name: string;
  panels: Panel[];
  variables: [
    {
      name: string;
      query: string;
    }
  ];
};
