import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { baseUrl } from "@/configs/config";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

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
  jwt: {
    async encode({ token }) {
      return jwt.sign(token as JWT, process.env.NEXTAUTH_SECRET as string);
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
        token.email = user.email;
        token.isUserVerified = user.isUserVerified;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        console.log(token);
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.userId = token.userId;
        session.user.email = token.email;
        session.user.isUserVerified = token.isUserVerified;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
  },
};
