import { axiosCommon } from "@/app/hooks/useAxios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";

const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // Example: 30 days
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          required: true,
          placeholder: "Your Email",
        },
        password: {
          label: "Password",
          type: "password",
          required: true,
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Check if credentials are provided
        if (!credentials) {
          return null;
        }

        try {
          // Make a POST request to your backend login endpoint
          const response = await axiosCommon.post("/users/login", {
            email,
            password,
          });

          // Assuming your backend returns user data on success
          const { user } = response.data; // Adjust based on your backend response structure

          // Check if user data is valid
          if (user && user.id) {
            // Ensure user has an ID
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            }; // Return the user object
          } else {
            return null; // Return null if no valid user data
          }
        } catch (error) {
          console.error("Login error:", error);
          return null; // Return null on error
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
