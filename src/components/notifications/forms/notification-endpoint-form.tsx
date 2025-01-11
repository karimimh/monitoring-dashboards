"use client";

import { NotificationEndpoint } from "@/types/notification";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface NotificationEndpointFormProps {
  onSubmit: (notifRule: NotificationEndpoint) => void;
}

const NotificationEndpointForm = ({
  onSubmit,
}: NotificationEndpointFormProps) => {
  const [endpointName, setEndpointName] = useState<string>("");
  const [sendVia, setSendVia] = useState<"telegram" | "bale">("telegram");
  const [chatId, setChatId] = useState<string>("");

  const sendViaItems = [
    {
      title: "تلگرام",
      value: "telegram",
    },
    {
      title: "بله",
      value: "bale",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div className="font-bold">نام مقصد</div>
        <Input
          dir="ltr"
          value={endpointName}
          onChange={(e) => setEndpointName(e.target.value)}
        />
        <div className="font-bold">ارسال از طریق</div>
        <Select
          dir="rtl"
          onValueChange={(v) => setSendVia(v as "telegram" | "bale")}
          value={sendVia}
        >
          <SelectTrigger className="w-48 h-10">
            {sendViaItems.find((item) => item.value === sendVia)?.title ??
              "انتخاب کنید ..."}
          </SelectTrigger>
          <SelectContent>
            {sendViaItems.map(({ title, value }) => (
              <SelectItem key={value} value={value}>
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="font-bold">شناسه چت</div>
        <Input
          dir="ltr"
          value={chatId}
          onChange={(e) => setChatId(e.target.value)}
        />
        <Button
          className="w-36"
          disabled={!endpointName || !sendVia}
          onClick={() =>
            onSubmit({
              name: endpointName,
              send_via: sendVia,
              chat_id: chatId,
            })
          }
        >
          افزودن
        </Button>
      </div>
    </div>
  );
};

export default NotificationEndpointForm;
