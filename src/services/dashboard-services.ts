import { Panel } from "@/types/panel";
import axios from "axios";
import * as crypto from "crypto";

export const getDashboard = async (id: string) => {
  const URL = `http://ir.snnf.me:8086/api/v2/inputs?id=${id}`;

  const response = await axios.get(URL, {
    headers: {
      Accept: "application/json",
      Authorization: "Token testtest",
      "Content-Type": "application/json",
    },
  });

  return response.data.dashboards[0];
};

export const getAllDashboards = async () => {
  const URL = `http://ir.snnf.me:8086/api/v2/input`;

  const response = await axios.get(URL, {
    headers: {
      Accept: "application/json",
      Authorization: "Token testtest",
      "Content-Type": "application/json",
    },
  });

  return response.data.dashboards;
};

export const createDashboard = async (name: string, panels: Panel[]) => {
  const URL = `http://ir.snnf.me:8086/api/v2/inputs`;

  const payload = {
    name,
    panels: panels.map((panel, index) => ({
      title: panel.title,
      queries: panel.queries[0],
      index,
    })),
    variables: [],
    id: crypto.randomBytes(8).toString("hex"),
    orgId: "02cdc6c4b5df4fb7",
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
