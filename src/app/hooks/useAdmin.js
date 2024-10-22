"use client";
// hooks/useAdmin.js
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Ensure this is correct for your Next.js version
import { useAuth } from "../context/authContext"; // Ensure the import path is correct

const useAdmin = () => {
  const { user, loading: authLoading } = useAuth(); // Get user and loading state from AuthContext
  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        // Redirect to sign-in page if not authenticated
        router.push("/login");
      } else if (user.role !== "admin") {
        // Redirect to unauthorized page or another appropriate page if not an admin
        router.push("/"); // Change this to your desired route for non-admins
      }
    }
  }, [authLoading, user, router]);
};

export default useAdmin;
