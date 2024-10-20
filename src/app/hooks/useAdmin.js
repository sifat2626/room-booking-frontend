// hooks/useAdmin.js
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const useAdmin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait for session loading
    if (!session || session.user.role !== "admin") {
      // Redirect to sign-in page if not authenticated or not an admin
      router.push("/login");
    }
  }, [session, status, router]);
};

export default useAdmin;
