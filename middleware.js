import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirect to login if the user is not authenticated
  },
});

// Protect routes that require authentication
export const config = {
  matcher: ["/dashboard", "/profile"], // Add the routes you want to protect
};
