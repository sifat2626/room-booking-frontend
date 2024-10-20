// hooks/useAuthClient.js
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Change this line

const useAuthClient = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait for session loading
    if (!session) {
      // Redirect to sign-in page if not authenticated
      router.push("/login");
    }
  }, [session, status, router]);
};

export default useAuthClient;
