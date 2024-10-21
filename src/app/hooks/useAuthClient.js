"use client";
// hooks/useAuthClient.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Ensure this is correct for your Next.js version
import { useAuth } from "../context/authContext";

const useAuthClient = () => {
  const { user, getUserDetails } = useAuth(); // Get user and getUserDetails from AuthContext
  const router = useRouter();
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user) {
        await getUserDetails(); // Fetch user details if not already loaded
      }
      setLoading(false); // Set loading to false after fetching
    };

    fetchUserDetails();
  }, [user, getUserDetails]);

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to sign-in page if not authenticated and loading is complete
      router.push("/login");
    }
  }, [loading, user, router]);
};

export default useAuthClient;
