"use client";

import { LoadingSpin } from "@/components/LoadingSpin";
import { useAuthContext } from "@/context/AuthContext";
import { LoginTemplate } from "@/templates/LoginTemplate";
import { redirect } from "next/navigation";

export default function Login() {
  const { user, loadingUser } = useAuthContext();

  if (loadingUser) {
    return <LoadingSpin />;
  }

  if (user) {
    redirect("/");
  }

  return <LoginTemplate />;
}
