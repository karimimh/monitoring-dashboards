"use client";

import ServerForm from "@/components/servers/server-form";
import ServersList from "@/components/servers/servers-list";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

// list server (name and ip), delete, edit
// add server ( name, ip , port , config <text box >, dropdown for type < snmp, pull, push, wmi > )

const ServersPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="pt-6 p-4">
      <div className="bg-white rounded-md w-full min-h-[calc(100vh-7rem)] p-4">
        <Button
          className="flex items-center"
          onClick={() => setIsOpen(true)}
          variant="default"
        >
          <PlusIcon className="size-4" />
          <span>افزودن سرور</span>
        </Button>
        <ServersList
          data={[
            {
              id: 1,
              name: "سرور 1",
              status: "active",
              latestCompleted: "در حال بارگیری...",
            },
            {
              id: 2,
              name: "سرور 2",
              status: "active",
              latestCompleted: "در حال بارگیری...",
            },
          ]}
        />
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-h-[70vh] overflow-y-auto" dir="rtl">
            <DialogTitle className="w-full text-center">
              افزودن سرور
            </DialogTitle>
            <ServerForm onSubmit={() => {}} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ServersPage;
