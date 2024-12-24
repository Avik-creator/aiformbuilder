import NextAuth, {type Session, type User} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import { db } from "./lib/schema";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

export const {
    handlers,
    auth,
    signIn,
    signOut,
  } = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            scope: "https://www.googleapis.com/auth/forms.body openid email profile",
          },
        },
      }),
    ],

    callbacks: {
      async session({ session, user }: { session: Session; user?: User }) {
        if (user && session?.user) {
          session.user.id = user.id;
        }
        return session;
      },
    },
    }
  );