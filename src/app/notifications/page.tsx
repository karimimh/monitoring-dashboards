"use client";

import NotificationChecks from "@/components/notifications/notification-checks";
import NotificationEndpoints from "@/components/notifications/notification-endpoints";
import NotificationCheckForm from "@/components/notifications/forms/notification-check-form";
import NotificationRuleForm from "@/components/notifications/forms/notification-rule-form";
import NotificationRulesList from "@/components/notifications/notification-rules";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAllNotificaionRules,
  useAllNotificationEndpoints,
  useAllNotifications,
  useCreateNotification,
  useCreateNotificationEndpoint,
  useCreateNotificationRule,
} from "@/hooks/use-notification";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import NotificationEndpointForm from "@/components/notifications/forms/notification-endpoint-form";

// name, send_via => telegram / bale, chat_id
// /api/v1/addnotification ( channelName: telegram_name / bale_name, chatID)
// /api/v1/NotificationEndpoint ()

// name, query, schedule_every, thresholds(CRIT, WARN, OK)
const NotificationsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  type TabValue = "alert" | "endpoint" | "rules";
  const [dialogSource, setDialogSource] = useState<
    "rule" | "endpoint" | "notification"
  >("rule");
  const [selectedTab, setSelectedTab] = useState<TabValue>("alert");
  const { mutate: createNotificationEndpoint } =
    useCreateNotificationEndpoint();
  const { mutate: createNotification } = useCreateNotification();
  const { mutate: createNotificationRule } = useCreateNotificationRule();
  const { data: allNotificationRules, refetch: refetchAllNotificationRules } =
    useAllNotificaionRules();
  const {
    data: allNotificationEndPoints,
    refetch: refetchAllNotificationEndpoints,
  } = useAllNotificationEndpoints();
  const { data: allNotificationChecks, refetch: refetchAllNotificationChecks } =
    useAllNotifications();

  return (
    <>
      <div className="p-4">
        <Tabs
          className="w-full"
          value={selectedTab}
          onValueChange={(v) => setSelectedTab(v as TabValue)}
        >
          <TabsList
            className="w-full text-black flex items-center bg-slate-300"
            dir="rtl"
          >
            <TabsTrigger className="flex-1" value="alert">
              اعلان‌
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="endpoint">
              مقاصد اعلان
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="rules">
              قوانین ارسال اعلان
            </TabsTrigger>
          </TabsList>

          <TabsContent
            className="bg-white rounded-md w-full min-h-[calc(100vh-9rem)] p-4"
            value="alert"
            dir="rtl"
          >
            <Button
              className="flex items-center"
              onClick={() => {
                setIsOpen(true);
                setDialogSource("notification");
              }}
              variant="default"
            >
              <PlusIcon className="size-4" />
              <span>افزودن اعلان</span>
            </Button>
            <NotificationChecks data={allNotificationChecks} />
          </TabsContent>
          <TabsContent
            className="bg-white rounded-md w-full min-h-[calc(100vh-9rem)] p-4"
            value="endpoint"
            dir="rtl"
          >
            <Button
              className="flex items-center"
              onClick={() => {
                setIsOpen(true);
                setDialogSource("endpoint");
              }}
              variant="default"
            >
              <PlusIcon className="size-4" />
              <span>افزودن مقصد</span>
            </Button>
            <NotificationEndpoints data={allNotificationEndPoints} />
          </TabsContent>
          <TabsContent
            className="bg-white rounded-md w-full min-h-[calc(100vh-9rem)] p-4"
            value="rules"
            dir="rtl"
          >
            <Button
              className="flex items-center"
              onClick={() => {
                setIsOpen(true);
                setDialogSource("rule");
              }}
              variant="default"
            >
              <PlusIcon className="size-4" />
              <span>افزودن قانون</span>
            </Button>
            <NotificationRulesList data={allNotificationRules} />
          </TabsContent>
        </Tabs>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[70vh] overflow-y-auto" dir="rtl">
          <DialogTitle className="w-full text-center">
            {dialogSource === "rule" ? "افزودن قانون" : "افزودن مقصد"}
          </DialogTitle>
          {dialogSource === "rule" && (
            <NotificationRuleForm
              onSubmit={async (rule) => {
                createNotificationRule(rule);
                setIsOpen(false);
                await refetchAllNotificationRules();
              }}
            />
          )}
          {dialogSource === "endpoint" && (
            <NotificationEndpointForm
              onSubmit={async (ep) => {
                createNotificationEndpoint(ep);
                await refetchAllNotificationEndpoints();
                setIsOpen(false);
              }}
            />
          )}
          {dialogSource === "notification" && (
            <NotificationCheckForm
              onSubmit={async (notif) => {
                createNotification(notif);
                await refetchAllNotificationChecks();
                setIsOpen(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotificationsPage;
