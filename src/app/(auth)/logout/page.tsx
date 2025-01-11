"use client";

import LoadingIndicator from "@/components/ui/loading-indicator";
import { httpClient } from "@/services/http-client";
import { useEffect } from "react";

const LogoutPage = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    httpClient.defaults.headers.common["Authorization"] = "";
    setTimeout(() => {
      location.href = "/login";
    }, 1000);
  }, []);
  return (
    <div className="absolute left-0 top-0 right-0 min-h-screen flex items-center justify-center text-blue-600">
      <div className="w-80 rounded-lg border shadow flex flex-col p-6 bg-white items-center justify-center gap-2">
        <LoadingIndicator />
        ...در حال خروج
      </div>
    </div>
  );
};

export default LogoutPage;
