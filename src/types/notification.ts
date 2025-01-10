export type NotificationRule = {
  name: string;
  conditions:
    | {
        type: "is_equal_to";
        value: string;
      }
    | {
        type: "changes_from_to";
        from: string;
        to: string;
      };
};

export type NotificationEndpoint = {
  name: string;
  send_via: "telegram" | "bale";
  chat_id: string;
};

export type Notification = {
  name: string;
  query: string;
  schedule_every: string;
  condition_type: "is_above" | "is_below";
  threshold_value: string;
  status_type: "CRIT" | "WARN" | "ANY" | "INFO";
};
