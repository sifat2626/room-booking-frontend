"use client";
import BookingHistory from "@/app/components/BookingHistory";
import useAuthClient from "../../hooks/useAuthClient";

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
