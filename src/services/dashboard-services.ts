import { DASHBOARD_URL } from "@/constants/urls";
import { Panel } from "@/types/panel";
import { httpClient } from "./http-client";
import { Dashboard } from "@/types/dashboard";

export const getDashboard = async (id: string) => {
  const URL = `${DASHBOARD_URL}?id=${id}`;

  const response = await httpClient.get(URL);

  return response.data.dashboards[0];
};

export const getAllDashboards = async () => {
  const URL = `${DASHBOARD_URL}`;
  const response = await httpClient.get(URL);
  return response.data;
};

export const createDashboard = async (name: string, panels: Panel[]) => {
  const URL = `${DASHBOARD_URL}`;

  const payload = {
    name,
    panels: panels.map((panel, index) => ({
      title: panel.title,
      query: panel.query[0],
      index,
    })),
    variables: [],
    orgId: "02cdc6c4b5df4fb7",
  };

  const response = await httpClient.post(URL, payload);
  return response.data;
};

export const deleteDashboard = async (id: string) => {
  const URL = `${DASHBOARD_URL}/${id}`;

  const response = await httpClient.delete(URL);
  return response.data;
};

export const saveDashboard = async (dashboard: Dashboard) => {
  const URL = `${DASHBOARD_URL}/${dashboard.id}`;

  const response = await httpClient.put(URL, dashboard);
  return response.data;
};
