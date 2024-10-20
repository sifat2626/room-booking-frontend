// hooks/useAuthServer.js
import { getToken } from "next-auth/jwt";

export const useAuthServer = async (req) => {
  const token = await getToken({ req });

  if (!token) {
    // Redirect to sign-in page if not authenticated
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return { props: {} }; // Return empty props if authenticated
};
