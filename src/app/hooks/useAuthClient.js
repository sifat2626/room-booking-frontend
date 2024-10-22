"use client";
// hooks/useAuthClient.js
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Ensure this is correct for your Next.js version
import { useAuth } from "../context/authContext";

const useAuthClient = (redirectPath = "/login") => {
  const { user, loading } = useAuth(); // Get user and loading state from AuthContext
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to sign-in page if not authenticated and loading is complete
      router.push(redirectPath);
    }
  }, [user, loading, router, redirectPath]);
};

export default useAuthClient;
