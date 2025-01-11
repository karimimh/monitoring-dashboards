"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { register } from "@/services/auth-services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const res = await register(username, email, password);
      if (res === "OK") router.push("/login");
      else alert("خطا در ثبت نام");
    } catch (err) {
      alert("خطا در ثبت نام");
      console.log(err);
    }
  };
  return (
    <main className="absolute left-0 top-0 right-0 min-h-screen flex items-center justify-center">
      <div className="rounded-lg shadow border bg-white px-4 py-2 w-80 min-h-80 flex flex-col gap-2">
        <h1 className="text-center text-xl font-bold h-16 w-full">ثبت نام</h1>
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
        <Button onClick={handleRegister}>ثبت نام</Button>
        <Link className="w-full text-center text-gray-400" href="/login">
          ورود
        </Link>
      </div>
    </main>
  );
};

export default RegisterPage;
