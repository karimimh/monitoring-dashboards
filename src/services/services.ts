import {
  NotificationEndpointApi,
  notificationEndpointSchema,
} from "@/schemas/notification";
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

export const executeVariableQuery = async (
  db: string,
  query: string
): Promise<string> => {
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

  return data;
};

export const getAllNotificationEndpoints = async (): Promise<string> => {
  const URL = `http://ir.snnf.me:8086/api/v2/notificationEndpoints?orgID=02cdc6c4b5df4fb7`;
  const response = await axios.get(URL, {
    headers: {
      Accept: "application/json",
      Authorization: "Token testtest",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

export const createNotificationEndpoint = async (
  name: string,
  sendVia: "telegram" | "bale",
  chatId: string
): Promise<NotificationEndpointApi> => {
  const URL = `http://gr.snnf.me:8081/api/v2/notificationEndpoints`;
  const payload = {
    authMethod: "none",
    method: "POST",
    type: "http",
    url: "http://ir.snnf.me:8086/api/v2/notification",
    orgId: "02cdc6c4b5df4fb7",
    status: "active",
    name: `${sendVia}_${name}`,
  };

  const URL2 = `http://gr.snnf.me:8081/api/v1/addnotification`;
  const payload2 = {
    channelName: `${sendVia}_${name}`,
    chatID: "asasas",
  };

  const x = await axios.post(URL2, qs.stringify(payload2), {
    headers: {
      Accept: "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzY2MjkwMzYsInVzZXJuYW1lIjoidGVzdCJ9.vi0b4wBQWo7lsZDTKS_TovYYpgjpgBo0UqiC4wvXwLU",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const response = await axios.post(URL, payload, {
    headers: {
      Accept: "application/json",
      Authorization: "Token testtest",
      "Content-Type": "application/json",
    },
  });

  return notificationEndpointSchema.parse(response.data);
};

export const createNotification = async (
  name: string,
  query: string,
  scheduleEvery: string,
  conditionType: "is_above" | "is_below",
  thresholdValue: string,
  statusType: "CRIT" | "WARN" | "ANY" | "INFO"
): Promise<string> => {
  const URL = `http://ir.snnf.me:8086/api/v2/checks`;
  const payload = {
    type: "threshold",
    name,
    orgId: "02cdc6c4b5df4fb7",
    query,
    every: scheduleEvery,
    thresholds: [
      {
        type: conditionType === "is_above" ? "greater" : "lesser",
        value: thresholdValue,
        level: statusType,
      },
    ],
  };

  const response = await axios.post(URL, payload, {
    headers: {
      Accept: "application/json",
      Authorization: "Token testtest",
      "Content-Type": "application/json",
    },
  });

  return notificationEndpointSchema.parse(response.data);
};

export const createNotificationRule = async (
  name: string,
  conditions:
    | {
        type: "is_equal_to" | "changes_from_to";
        value: string;
      }
    | {
        type: "changes_from_to";
        from: string;
        to: string;
      }
): Promise<string> => {
  const URL = `http://ir.snnf.me:8086/api/v2/notificationRules`;
  const payload = {
    name,
    orgID: "02cdc6c4b5df4fb7",
    status: "active",
    channelID: "02cdc6c4b5df4fb7",
    conditions: [
      {
        type: conditions.type,
        value: conditions.value,
      },
    ],
  };

  const response = await axios.post(URL, payload, {
    headers: {
      Accept: "application/json",
      Authorization: "Token testtest",
      "Content-Type": "application/json",
    },
  });

  return notificationEndpointSchema.parse(response.data);
};
