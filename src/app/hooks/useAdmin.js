// hooks/useAdmin.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Ensure this is correct for your Next.js version
import { useAuth } from "../context/authContext"; // Ensure the import path is correct

const useAdmin = () => {
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
    if (!loading) {
      if (!user) {
        // Redirect to sign-in page if not authenticated and loading is complete
        router.push("/login");
      } else if (user.role !== "admin") {
        // Redirect to unauthorized page or another appropriate page if not an admin
        router.push("/"); // Change this to your desired route for non-admins
      }
    }
  }, [loading, user, router]);
};

export default useAdmin;
