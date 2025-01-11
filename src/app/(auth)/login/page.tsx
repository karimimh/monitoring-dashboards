"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/services/auth-services";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const token = await login(username, password, email);
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;
        axios.defaults.headers.common["Content-Type"] = "application/json";
        axios.defaults.headers.common["Accept"] = "application/json";
        router.push("/dashboards");
      } else alert("خطا در ورود");
    } catch (err) {
      alert("خطا در ورود");
      console.log(err);
    }
  };
  return (
    <main className="absolute left-0 top-0 right-0 min-h-screen flex items-center justify-center">
      <div className="rounded-lg shadow border bg-white px-4 py-2 w-80 min-h-80 flex flex-col gap-2">
        <h1 className="text-center text-xl font-bold h-16 w-full">ورود</h1>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="نام کاربری"
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="رمز عبور"
          type="password"
        />
        <div className="flex-1" />
        <Button onClick={handleLogin}>ورود</Button>
        <Link className="w-full text-center text-gray-400" href="/register">
          ثبت نام
        </Link>
      </div>
    </main>
  );
};

export default LoginPage;
