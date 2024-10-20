import { axiosCommon } from "@/app/hooks/useAxios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // Example: 1 day
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

          // Assuming your backend returns user data and an access token on success
          const { user, accessToken } = response.data; // Adjust based on your backend response structure

          // Check if user data is valid
          if (user && user.id) {
            // Use absolute URL for setting the cookie
            const apiUrl = `${process.env.NEXTAUTH_URL}/api/set-access-token`; // Ensure NEXTAUTH_URL is set in your .env file

            await fetch(apiUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ accessToken }),
            });

            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Attach user role to token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role; // Attach user role to session
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
