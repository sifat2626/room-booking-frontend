"use client";
import useAdmin from "@/app/hooks/useAdmin";
import useAuthClient from "@/app/hooks/useAuthClient";
import { useSession } from "next-auth/react";

function Page() {
  useAdmin();
  return <div>Admin Dashboard</div>;
}

export default Page;
