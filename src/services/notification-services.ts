import {
  BASE_URL_1,
  NOTIFICATION_CHECKS_URL,
  NOTIFICATION_ENDPOINTS_URL,
  NOTIFICATION_ENDPOINTS_URL_2,
  NOTIFICATION_RULES_URL,
} from "@/constants/urls";
import {
  NotificationEndpointApi,
  notificationEndpointSchema,
} from "@/schemas/notification";
import * as crypto from "crypto";
import qs from "qs";
import { httpClient } from "./http-client";

export const getAllNotificationEndpoints = async () => {
  const URL = `${NOTIFICATION_ENDPOINTS_URL}?orgID=02cdc6c4b5df4fb7`;
  const response = await httpClient.get(URL);

  return response.data.notificationEndpoints;
};

export const createNotificationEndpoint = async (
  name: string,
  sendVia: "telegram" | "bale"
): Promise<NotificationEndpointApi> => {
  const URL = NOTIFICATION_ENDPOINTS_URL;
  const payload = {
    authMethod: "none",
    method: "POST",
    type: "http",
    url: `${BASE_URL_1}/api/v1/notification`,
    orgId: "02cdc6c4b5df4fb7",
    status: "active",
    name: `${sendVia}_${name}`,
  };

  const URL2 = NOTIFICATION_ENDPOINTS_URL_2;
  const payload2 = {
    channelName: `${sendVia}_${name}`,
    chatID: "asasas",
  };

  await httpClient.post(URL2, qs.stringify(payload2));
  const response = await httpClient.post(URL, payload);

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
  const URL = NOTIFICATION_CHECKS_URL;
  const payload = {
    type: "threshold",
    activeStatus: "active",
    status: "active",
    name,
    id: crypto.randomBytes(8).toString("hex"),
    orgId: "02cdc6c4b5df4fb7",
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

  const response = await httpClient.post(URL, payload);

  return response.data.notificationEndpoints;
};

export const getAllNotifications = async () => {
  const URL = `${NOTIFICATION_CHECKS_URL}?orgID=02cdc6c4b5df4fb7`;
  const response = await httpClient.get(URL);

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
  const URL = NOTIFICATION_RULES_URL;
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
    orgID: "02cdc6c4b5df4fb7",
    status: "active",
    activeStatus: "active",
    description: "",
    channelID: "02cdc6c4b5df4fb7",
    every: "1m",
    labels: [],
    endpointID,
    statusRules: [statusCondition],
    type: "http",
  };

  const response = await httpClient.post(URL, payload);

  return response.data;
};

export const getAllNotificationRules = async () => {
  const URL = `${NOTIFICATION_RULES_URL}?orgID=02cdc6c4b5df4fb7`;
  const response = await httpClient.get(URL);

  return response.data.notificationRules;
};
