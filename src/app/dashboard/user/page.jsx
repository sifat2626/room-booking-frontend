"use client";
import BookingHistory from "@/app/components/BookingHistory";
import { useContext } from "react";
import authContext, { useAuth } from "@/app/context/authContext";
import useAuthClient from "@/app/hooks/useAuthClient";

function Page() {
  useAuthClient();
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <h3 className="text-center text-green-500 text-2xl font-bold">
        {user?.name}
      </h3>
      <BookingHistory userId={user?.id} />
    </div>
  );
}

export default Page;
