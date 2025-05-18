import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { baseUrl } from "@/configs/config";
import { encode } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${baseUrl}sign-in`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const resdata = await res.json();
          if (resdata.success) {
            const user = resdata.data;

            if (user) {
              return user;
            }
            return null;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user}) {
      if (user) {
        token.userId = user.userId;
        token.email = user.email;
        token.isUserVerified = user.isUserVerified;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }

    
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          userId: token.userId,
          email: token.email,
          isUserVerified: token.isUserVerified,
          firstName: token.firstName,
          lastName: token.lastName,
        };

        session.accessToken = await encode({
          token,
          secret: process.env.NEXTAUTH_SECRET!,
        });

        return session;
      }

      return session;
    },
  },
};
