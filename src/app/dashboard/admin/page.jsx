"use client";
import useAuthClient from "@/app/hooks/useAuthClient";
import { useSession } from "next-auth/react";

function Page() {
  useAuthClient();
  const { data: session } = useSession();
  return <div>Admin Dashboard</div>;
}

export default Page;
