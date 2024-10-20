"use client";
import useAuthClient from "@/app/hooks/useAuthClient";

function Page({ params }) {
  useAuthClient();
  return (
    <div>
      <h3>Details page</h3>
    </div>
  );
}

export default Page;
