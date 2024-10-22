"use client";
import AdminDashboard from "@/app/components/dashboard/admin/AdminDashboard";
import useAdmin from "@/app/hooks/useAdmin";

function Page() {
  useAdmin();
  return (
    <div>
      <AdminDashboard />
    </div>
  );
}

export default Page;
