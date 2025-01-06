import { PanelType, panelSchema } from "@/schemas/panel";
import axios from "axios";
import qs from "qs";

export const fetchPanel = async (): Promise<PanelType> => {
  const BASE_URL = "http://ir.snnf.me:8086/query?db=influx";

  const payload = {
    q: `SELECT mean("available_percent") FROM "mem" WHERE "host" =~ /^docker-telegraf$/ and time >= 1735998980696ms and time <= 1736171750696ms GROUP BY time(1m) fill(null)`,
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
