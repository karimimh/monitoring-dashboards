import {
  createNotificationCheck,
  createNotificationEndpoint,
  createNotificationRule,
  getAllNotificationEndpoints,
  getAllNotificationRules,
  getAllNotifications,
} from "@/services/notification-services";
import {
  Notification,
  NotificationEndpoint,
  NotificationRule,
} from "@/types/notification";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAllNotificationEndpoints = () => {
  return useQuery({
    queryKey: ["notificationEndpoints"],
    queryFn: getAllNotificationEndpoints,
  });
};

export const useAllNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotifications,
  });
};

export const useAllNotificaionRules = () => {
  return useQuery({
    queryKey: ["notificationRules"],
    queryFn: getAllNotificationRules,
  });
};

export const useCreateNotificationEndpoint = () => {
  return useMutation({
    mutationFn: async (data: NotificationEndpoint) => {
      await createNotificationEndpoint(data.name, data.send_via, data.chat_id);
    },
  });
};

export const useCreateNotification = () => {
  return useMutation({
    mutationFn: async (data: Notification) => {
      await createNotificationCheck(
        data.name,
        data.query,
        data.schedule_every,
        data.condition_type,
        data.threshold_value,
        data.status_type
      );
    },
  });
};

export const useCreateNotificationRule = () => {
  return useMutation({
    mutationFn: async (data: NotificationRule) => {
      await createNotificationRule(data.name, data.conditions, data.endpointId);
    },
  });
};
