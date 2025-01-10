import { Panel } from "@/types/panel";
import axios from "axios";

export const getDashboard = async (id: string): Promise<string> => {
  const URL = `http://ir.snnf.me:8086/api/v2/dashboard?id=${id}`;

  const response = await axios.get(URL, {
    headers: {
      Accept: "application/json",
      Authorization: "Token testtest",
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const getAllDashboards = async (): Promise<string> => {
  const URL = `http://ir.snnf.me:8086/api/v2/dashboards`;

  const response = await axios.get(URL, {
    headers: {
      Accept: "application/json",
      Authorization: "Token testtest",
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const createDashboard = async (
  name: string,
  panels: Panel[]
): Promise<string> => {
  const URL = `http://ir.snnf.me:8086/api/v2/dashboard`;

  const payload = {
    name,
    panels: panels.map((panel, index) => ({
      title: panel.title,
      queries: panel.queries[0],
      index,
    })),
    variables: [],
  };

  const response = await axios.post(URL, payload, {
    headers: {
      Accept: "application/json",
      Authorization: "Token testtest",
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
