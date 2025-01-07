import { PanelApi, panelApiSchema } from "@/schemas/panel";
import axios from "axios";
import qs from "qs";

export const executeDatabaseQuery = async (
  db: string,
  query: string
): Promise<PanelApi> => {
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

  const parsedData = panelApiSchema.parse(data);
  return parsedData;
};