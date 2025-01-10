"use client";

import { Notification } from "@/types/notification";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

interface NotificationFormProps {
  onSubmit: (notif: Notification) => void;
}

const NotificationForm = ({ onSubmit }: NotificationFormProps) => {
  const [notifName, setNotifName] = useState<string>("");
  const [scheduleEvery, setScheduleEvery] = useState<
    | "5s"
    | "15s"
    | "1m"
    | "5m"
    | "15m"
    | "1h"
    | "6h"
    | "12h"
    | "24h"
    | "2d"
    | "7d"
    | "30d"
  >("1m");
  const [query, setQuery] = useState<string>("");
  const [conditionType, setConditionType] = useState<"is_above" | "is_below">(
    "is_above"
  );
  const [thresholdValue, setThresholdValue] = useState<string>("");
  const [statusType, setStatusType] = useState<
    "CRIT" | "INFO" | "WARN" | "ANY"
  >("CRIT");

  const conditionTypeItems = [
    {
      title: "بالاتر از",
      value: "is_above",
    },
    {
      title: "پایین‌تر از",
      value: "is_below",
    },
  ];

  const statusTypeItems = [
    {
      title: "بحرانی (CRIT)",
      value: "CRIT",
    },
    {
      title: "اطلاع‌رسانی (INFO)",
      value: "INFO",
    },
    {
      title: "اخطار (WARN)",
      value: "WARN",
    },
    {
      title: "هرچیز (ANY)",
      value: "ANY",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div className="font-bold">نام اعلان</div>
        <Input
          value={notifName}
          onChange={(e) => setNotifName(e.target.value)}
        />
        <div className="font-bold">بازه زمانی ارسال</div>
        <Select
          dir="rtl"
          onValueChange={(v) => setScheduleEvery(v as typeof scheduleEvery)}
          value={scheduleEvery}
        >
          <SelectTrigger className="w-32 h-10">{scheduleEvery}</SelectTrigger>
          <SelectContent className="max-h-48">
            {[
              "5s",
              "15s",
              "1m",
              "5m",
              "15m",
              "1h",
              "6h",
              "12h",
              "24h",
              "2d",
              "7d",
              "30d",
            ].map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="font-bold">کوئری</div>
        <Input
          dir="ltr"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="p-2 font-bold">تنظیم سطح آستانه</div>
        <div className="flex items-center flex-wrap gap-2">
          <span>وقتی مقدار</span>
          <Select
            dir="rtl"
            onValueChange={(v) =>
              setConditionType(v as "is_above" | "is_below")
            }
            value={conditionType}
          >
            <SelectTrigger className="w-32 h-10">
              {conditionTypeItems.find((item) => item.value === conditionType)
                ?.title ?? "انتخاب کنید ..."}
            </SelectTrigger>
            <SelectContent>
              {conditionTypeItems.map(({ title, value }) => (
                <SelectItem key={value} value={value}>
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            className="w-28"
            value={thresholdValue}
            placeholder="سطح آستانه"
            onChange={(e) => setThresholdValue(e.target.value)}
          />
          <span>بود، وضعیت را در حالت </span>
          <Select
            dir="rtl"
            value={statusType}
            onValueChange={(v) => setStatusType(v)}
          >
            <SelectTrigger className="w-32 h-10">
              {statusTypeItems.find((item) => item.value === statusType)
                ?.title ?? "انتخاب کنید ..."}
            </SelectTrigger>
            <SelectContent>
              {statusTypeItems.map(({ title, value }) => (
                <SelectItem key={value} value={value}>
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>قرار بده.</span>
        </div>
        <Button
          className="w-36 mt-2"
          disabled={!notifName || !query || !thresholdValue}
          onClick={() => {
            onSubmit({
              name: notifName,
              schedule_every: scheduleEvery,
              query,
              condition_type: conditionType,
              threshold_value: thresholdValue,
              status_type: statusType,
            });
          }}
        >
          افزودن
        </Button>
      </div>
    </div>
  );
};

export default NotificationForm;
