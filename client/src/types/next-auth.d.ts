import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    isUserVerified?: boolean;
    fullName?: string;
    email?:string
  }
  interface Session {
    user: {
      id?: string;
      isUserVerified?: boolean;
      fullName?: string;
      email?:string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?:string;
    isUserVerified?: boolean;
    fullName?: string;
  }
}