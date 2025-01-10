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
  const BASE_URL = `http://localhost:8086/query?db=${db}`;

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
  const BASE_URL = `http://localhost:8086/query?db=${db}`;

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
  const URL = `http://localhost:8086/api/v2/notificationEndpoints?orgID=YOUR_ORG_ID`;
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
  const URL = `http://localhost:8081/api/v2/notificationEndpoints`;
  const payload = {
    authMethod: "none",
    method: "POST",
    type: "http",
    url: "http://localhost:8086/api/v2/notification",
    orgId: "YOUR_ORG_ID",
    status: "active",
    name: `${sendVia}_${name}`,
  };

  const URL2 = `http://localhost:8081/api/v1/addnotification`;
  const payload2 = {
    channelName: `${sendVia}_${name}`,
    chatID: "asasas",
  };

  const x = await axios.post(URL2, qs.stringify(payload2), {
    headers: {
      Accept: "application/json",
      Authorization:
        "REDACTED_TOKEN",
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
  const URL = `http://localhost:8086/api/v2/checks`;
  const payload = {
    type: "threshold",
    name,
    orgId: "YOUR_ORG_ID",
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
  const URL = `http://localhost:8086/api/v2/notificationRules`;
  const payload = {
    name,
    orgID: "YOUR_ORG_ID",
    status: "active",
    channelID: "YOUR_ORG_ID",
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
