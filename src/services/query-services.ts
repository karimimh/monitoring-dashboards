import { DATABASE_QUERY_URL } from "@/constants/urls";
import { PanelApi, panelApiSchema } from "@/schemas/panel";
import { httpClient } from "./http-client";

export const executeDatabaseQuery = async (
  db: string,
  query: string
): Promise<PanelApi> => {
  const BASE_URL = `${DATABASE_QUERY_URL}?db=${db}`;

  const payload = {
    q: query,
  };

  const response = await httpClient.post(BASE_URL, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  });

  const data = response.data;

  const parsedData = panelApiSchema.parse(data);
  return parsedData;
};

export const executeVariableQuery = async (
  db: string,
  query: string
): Promise<string> => {
  const BASE_URL = `${DATABASE_QUERY_URL}?db=${db}`;

  const payload = {
    q: query,
  };

  const response = await httpClient.post(BASE_URL, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  });

  const data = response.data;

  return data;
};
