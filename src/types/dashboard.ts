import { Panel } from "./panel";

export type Dashboard = {
  id: string;
  name: string;
  panels: Panel[];
  variables: {
    name: string;
    query: string;
  }[];
};
