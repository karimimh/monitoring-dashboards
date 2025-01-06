import { PanelType, panelSchema } from "@/schemas/panel";
import axios from "axios";
import qs from "qs";

export const fetchPanel = async (
  db: string,
  query: string
): Promise<PanelType> => {
  const BASE_URL = `http://ir.snnf.me:8086/query?db=${db}`;

  const payload = {
    q: query,
  };

  const response = await axios.post(BASE_URL, qs.stringify(payload), {
    headers: {
      Accept: "application/json",
      Authorization: "Token testtest",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = response.data;

  const parsedData = panelSchema.parse(data);
  return parsedData;
};

export const fetchPanels = async (
  db: string,
  queries: string[]
): Promise<PanelType[]> => {
  const promises = queries.map((query) => fetchPanel(db, query));
  return Promise.all(promises);
};

export const fetchAllPanels = async (
  db: string,
  queries: string[][]
): Promise<PanelType[][]> => {
  const promises = queries.map((query) => fetchPanels(db, query));
  return Promise.all(promises);
};
