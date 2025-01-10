"use client";

import NotificationEndpointForm from "@/components/notifications/notification-endpoint-form";
import NotificationEndpoints from "@/components/notifications/notification-endpoints";
import NotificationForm from "@/components/notifications/notification-form";
import NotificationRuleForm from "@/components/notifications/notification-rule-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useCreateNotification,
  useCreateNotificationEndpoint,
} from "@/hooks/use-notification";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

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
  const {
    mutate: createNotificationEndpoint,
    isPending: isNotifEndpointPending,
  } = useCreateNotificationEndpoint();
  const { mutate: createNotification, isPending: isNotifPending } =
    useCreateNotification();
  return (
    <>
      <div className="p-4">
        <Tabs
          className="w-full"
          value={selectedTab}
          onValueChange={(v) => setSelectedTab(v as TabValue)}
        >
          <TabsList className="w-full text-black" dir="rtl">
            <TabsTrigger className="w-36" value="alert">
              اعلان‌
            </TabsTrigger>
            <TabsTrigger className="w-36" value="endpoint">
              مقاصد اعلان
            </TabsTrigger>
            <TabsTrigger className="w-36" value="rules">
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
            <NotificationEndpoints />
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
          </TabsContent>
        </Tabs>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[70vh] overflow-y-auto" dir="rtl">
          <DialogTitle className="w-full text-center">
            {dialogSource === "rule" ? "افزودن قانون" : "افزودن مقصد"}
          </DialogTitle>
          {dialogSource === "rule" && (
            <NotificationRuleForm onSubmit={(rule) => console.log(rule)} />
          )}
          {dialogSource === "endpoint" && (
            <NotificationEndpointForm
              onSubmit={(ep) => {
                createNotificationEndpoint(ep);
              }}
            />
          )}
          {dialogSource === "notification" && (
            <NotificationForm
              onSubmit={(notif) => {
                createNotification(notif);

              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotificationsPage;
