"use client";

import { Server } from "@/types/server";
import { useState } from "react";
import AutogrowingTextarea from "../ui/autogrowing-textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

interface ServerFormProps {
  onSubmit: (notif: Server) => void;
}

const ServerForm = ({ onSubmit }: ServerFormProps) => {
  const [serverName, setServerName] = useState<string>("");
  const [ip, setIp] = useState<string>("");
  const [config, setConfig] = useState<string>("");
  const [serverType, setServerType] = useState<"SNMP" | "PULL" | "PUSH">(
    "SNMP"
  );
  const [port, setPort] = useState<string>("");

  const serverTypeItems = [
    {
      title: "SNMP",
      value: "SNMP",
    },
    {
      title: "PULL",
      value: "PULL",
    },
    {
      title: "PUSH",
      value: "PUSH",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div className="font-bold">نام سرور</div>
        <Input
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
        />
        <div className="font-bold">آدرس</div>
        <Input dir="ltr" value={ip} onChange={(e) => setIp(e.target.value)} />
        <div className="font-bold">پورت</div>
        <Input
          dir="ltr"
          value={port}
          onChange={(e) => setPort(e.target.value)}
        />
        <div className="font-bold">کانفیگ</div>
        <AutogrowingTextarea
          value={config}
          onChange={(t) => setConfig(t)}
          minRows={3}
          maxRows={5}
          className="w-full"
          placeholder="کانفیگ"
        />
        <div className="font-bold">نوع</div>
        <Select
          dir="rtl"
          onValueChange={(v) => setServerType(v as "SNMP" | "PULL" | "PUSH")}
          value={serverType}
        >
          <SelectTrigger className="w-48 h-10">
            {serverTypeItems.find((item) => item.value === serverType)?.title ??
              "انتخاب کنید ..."}
          </SelectTrigger>
          <SelectContent>
            {serverTypeItems.map(({ title, value }) => (
              <SelectItem key={value} value={value}>
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          className="w-36 mt-2"
          disabled={!serverName || !ip || !config}
          onClick={() => {
            onSubmit({
              name: serverName,
              ip,
              port,
              config,
              type: serverType,
            });
          }}
        >
          افزودن
        </Button>
      </div>
    </div>
  );
};

export default ServerForm;
