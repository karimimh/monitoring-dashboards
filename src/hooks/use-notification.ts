import {
  createNotification,
  createNotificationEndpoint,
  getAllNotificationEndpoints,
} from "@/services/services";
import { Notification, NotificationEndpoint } from "@/types/notification";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAllNotificationEndpoints = () => {
  return useQuery({
    queryKey: ["notificationEndpoints"],
    queryFn: async () => {
      const result = await getAllNotificationEndpoints();
      return result;
    },
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
      await createNotification(
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

