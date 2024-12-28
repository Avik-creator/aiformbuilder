import NextAuth, {type Session, type User} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import { db } from "./lib/db";
import { sendWelcomeEmail } from "./components/email/mail";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params:{
          access_type: "offline",
          prompt: "consent",
          scope: [
            "https://www.googleapis.com/auth/forms.body",
            "openid",
            "email",
            "profile",
          ].join(" "),
          response: "code",
        }
      }
    }),
  ],

  callbacks:{
    async session({ session, user }) {
      if(user && session?.user){
        session.user.id = user.id;
      }
      return session;
    }
  },
  events:{
    createUser: async ({user}) => {
      await sendWelcomeEmail({
        email: user?.email as string,
        name: user?.name,
      })
    },
  }
})