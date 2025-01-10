"use client";

import { NotificationRule } from "@/types/notification";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

interface NotificationRuleFormProps {
  onSubmit: (notifRule: NotificationRule) => void;
}

const NotificationRuleForm = ({ onSubmit }: NotificationRuleFormProps) => {
  const [ruleName, setRuleName] = useState<string>("");
  const [conditionType, setConditionType] = useState<
    "is_equal_to" | "changes_from_to"
  >("is_equal_to");
  const [conditionValue, setConditionValue] = useState<string>("");
  const [conditionFrom, setConditionFrom] = useState<string>("");
  const [conditionTo, setConditionTo] = useState<string>("");

  const conditionTypeItems = [
    {
      title: "برابر است با",
      value: "is_equal_to",
    },
    {
      title: "تغییر وضعیت می‌دهد",
      value: "changes_from_to",
    },
  ];

  const conditionValueItems = [
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
      title: "خوب (OK)",
      value: "OK",
    },
    {
      title: "هرچیز (ANY)",
      value: "ANY",
    },
  ];

  const conditionFromItems = [
    {
      title: "اطلاع‌رسانی (INFO)",
      value: "INFO",
    },
    {
      title: "اخطار (WARN)",
      value: "WARN",
    },
    {
      title: "خوب (OK)",
      value: "OK",
    },
    {
      title: "هرچیز (ANY)",
      value: "ANY",
    },
  ];

  const conditionToItems = [
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
        <div className="font-bold">نام قانون</div>
        <Input value={ruleName} onChange={(e) => setRuleName(e.target.value)} />
        <div className="p-2 font-bold">شرایط ارسال اعلان</div>
        <div className="flex items-center flex-wrap gap-2">
          <span>وقتی وضعیت</span>
          <Select
            dir="rtl"
            onValueChange={(v) => {
              const conditionType = v as "is_equal_to" | "changes_from_to";
              if (conditionType === "is_equal_to") {
                setConditionType("is_equal_to");
              } else {
                setConditionType("changes_from_to");
              }
            }}
            value={conditionType}
          >
            <SelectTrigger className="w-48 h-10">
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
          {conditionType === "is_equal_to" ? (
            <Select
              dir="rtl"
              value={conditionValue}
              onValueChange={(v) => setConditionValue(v)}
            >
              <SelectTrigger className="w-32 h-10">
                {conditionValueItems.find(
                  (item) => item.value === conditionValue
                )?.title ?? "انتخاب کنید ..."}
              </SelectTrigger>
              <SelectContent>
                {conditionValueItems.map(({ title, value }) => (
                  <SelectItem key={value} value={value}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <>
              <span>از</span>
              <Select
                dir="rtl"
                value={conditionFrom}
                onValueChange={(v) => setConditionFrom(v)}
              >
                <SelectTrigger className="w-32 h-10">
                  {conditionFromItems.find(
                    (item) => item.value === conditionFrom
                  )?.title ?? "انتخاب کنید ..."}
                </SelectTrigger>
                <SelectContent>
                  {conditionFromItems.map(({ title, value }) => (
                    <SelectItem key={value} value={value}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span>به</span>
              <Select
                dir="rtl"
                value={conditionTo}
                onValueChange={(v) => setConditionTo(v)}
              >
                <SelectTrigger className="w-32 h-10">
                  {conditionToItems.find((item) => item.value === conditionTo)
                    ?.title ?? "انتخاب کنید ..."}
                </SelectTrigger>
                <SelectContent>
                  {conditionToItems.map(({ title, value }) => (
                    <SelectItem key={value} value={value}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        </div>
        <Button
          className="w-36"
          disabled={
            !ruleName || !(conditionValue || (conditionFrom && conditionTo))
          }
          onClick={() =>
            onSubmit({
              name: ruleName,
              conditions: {
                type: conditionType,
                value: conditionValue,
                from: conditionFrom,
                to: conditionTo,
              },
            })
          }
        >
          افزودن
        </Button>
      </div>
    </div>
  );
};

export default NotificationRuleForm;
