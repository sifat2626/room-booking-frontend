"use client";
import BookingHistory from "@/app/components/BookingHistory";
import { useContext } from "react";
import authContext, { useAuth } from "@/app/context/authContext";
import useAuthClient from "@/app/hooks/useAuthClient";

function Page() {
  useAuthClient();
  return (
    <div>
      <h3>user dashboard</h3>
      <BookingHistory />
    </div>
  );
}

export default Page;
