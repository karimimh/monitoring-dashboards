import {
  NotificationEndpointApi,
  notificationEndpointSchema,
} from "@/schemas/notification";
import axios from "axios";
import qs from "qs";
import * as crypto from "crypto";

export const getAllNotificationEndpoints = async () => {
  const URL = `http://localhost:8086/api/v2/notificationEndpoints?orgID=YOUR_ORG_ID`;
  const response = await axios.get(URL, {
    headers: {
      Accept: "application/json",
      Authorization: "Token testtest",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data.notificationEndpoints;
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

export const createNotificationCheck = async (
  name: string,
  query: string,
  scheduleEvery: string,
  conditionType: "is_above" | "is_below",
  thresholdValue: string,
  statusType: "CRIT" | "WARN" | "ANY" | "INFO"
) => {
  const URL = `http://localhost:8086/api/v2/checks`;
  const payload = {
    type: "threshold",
    activeStatus: "active",
    status: "active",
    name,
    id: crypto.randomBytes(8).toString("hex"),
    orgId: "YOUR_ORG_ID",
    query: JSON.parse(query),
    every: scheduleEvery,
    thresholds: [
      {
        allValues: false,
        type: conditionType === "is_above" ? "greater" : "lesser",
        value: Number(thresholdValue),
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

  return response.data.notificationEndpoints;
};

export const getAllNotifications = async () => {
  const URL = `http://localhost:8086/api/v2/checks?orgID=YOUR_ORG_ID`;
  const response = await axios.get(URL, {
    headers: {
      Accept: "application/json",
      Authorization: "Token testtest",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data.checks;
};

export const createNotificationRule = async (
  name: string,
  conditions:
    | {
        type: "is_equal_to";
        value: string;
      }
    | {
        type: "changes_from_to";
        from: string;
        to: string;
      },
  endpointID: string
) => {
  const URL = `http://localhost:8086/api/v2/notificationRules`;
  const statusCondition =
    conditions.type === "is_equal_to"
      ? {
          count: 1,
          currentLevel: conditions.value,
          period: "1h",
        }
      : {
          count: 1,
          currentLevel: conditions.to,
          previousLevel: conditions.from,
          period: "1h",
        };
  const payload = {
    name,
    orgID: "YOUR_ORG_ID",
    status: "active",
    activeStatus: "active",
    description: "",
    channelID: "YOUR_ORG_ID",
    every: "1m",
    labels: [],
    endpointID,
    statusRules: [statusCondition],
    type: "http",
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

export const getAllNotificationRules = async () => {
  const URL = `http://localhost:8086/api/v2/notificationRules?orgID=YOUR_ORG_ID`;
  const response = await axios.get(URL, {
    headers: {
      Accept: "application/json",
      Authorization: "Token testtest",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data.notificationRules;
};
