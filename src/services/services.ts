import { DATABASE_QUERY_URL } from "@/constants/urls";
import { PanelApi, panelApiSchema } from "@/schemas/panel";
import axios from "axios";
import qs from "qs";

export const executeDatabaseQuery = async (
  db: string,
  query: string
): Promise<PanelApi> => {
  const BASE_URL = `${DATABASE_QUERY_URL}?db=${db}`;

  const payload = {
    q: query,
  };

  const response = await axios.post(BASE_URL, qs.stringify(payload));

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

  const response = await axios.post(BASE_URL, qs.stringify(payload));

  const data = response.data;

  return data;
};
