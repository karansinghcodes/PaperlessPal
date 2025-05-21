import { Jwt } from "jsonwebtoken";
import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken: string;
    userId?: string;
    isUserVerified?: boolean;
    firstName?: string;
    lastName?: string;
    email?: string;
  }
  interface Session {
    user: {
      userId?: string;
      isUserVerified?: boolean;
      firstName?: string;
      lastName?: string;
      email?: string;
    } & DefaultSession["user"];

    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    userId?: string;
    isUserVerified?: boolean;
    firstName?: string;
    lastName?: string;
    email?: string;
  }
}
