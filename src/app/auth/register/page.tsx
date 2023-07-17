"use client";

import { useAuthContext } from "@/context/AuthContext";
import { RegisterTemplate } from "@/templates/RegisterTemplate";
import { redirect } from "next/navigation";

export default function Register() {
  const { user } = useAuthContext();

  if (user) {
    redirect("/");
  }

  return <RegisterTemplate />;
}
