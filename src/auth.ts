// import NextAuth from 'next-auth';
// import Google from 'next-auth/providers/google';
// import { users } from "./lib/schema"
// import { db } from "./lib/db";
// import { eq } from 'drizzle-orm';
// import type { NextAuthConfig, Session } from 'next-auth';

// export const config = {
//   theme: {
//     logo: 'https://next-auth.js.org/img/logo/logo-sm.png',
//   },
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID ?? '',
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
//       authorization: {
//         params: {
//           access_type: 'offline',
//           prompt: 'consent',
//           scope: [
//             'https://www.googleapis.com/auth/forms.body openid email profile'
//           ].join(' '),
//           response: 'code',
//         },
//       },
//     }),
//   ],
//   callbacks: {
//     authorized({ request, auth }) {
//       return !!auth;
//     },
//     async jwt({ token, user, account }) {
//       // Initial sign in
//       if (account && user) {
//         const existingUser = await db.query.users.findFirst({
//           where: eq(users.email, user.email!)
//         });

//         if (!existingUser && user.email) {
//           const result = await db.insert(users).values({
//             email: user.email,
//             name: user.name ?? '',
//             image: user.image ?? '',
//             dbUserId: user.id ?? ''
//           }).returning({ insertedId: users.dbUserId });

//           token.userId = result[0].insertedId;
//         } else if (existingUser) {
//           await db.update(users).set({
//             name: user.name ?? existingUser.name,
//             image: user.image ?? existingUser.image,
//             dbUserId: user.id ?? existingUser.dbUserId
//           }).where(eq(users.email, user.email!))

//           token.userId = user.id ?? existingUser.dbUserId;
//         }

//         return {
//           ...token,
//           access_token: account.access_token,
//           issued_at: Date.now(),
//           expires_at: Date.now() + Number(account.expires_in) * 1000,
//           refresh_token: account.refresh_token,
//         };
//       } else if (token.expires_at && Date.now() < Number(token.expires_at)) {
//         return token;
//       } else {
//         try {
//           const response = await fetch('https://oauth2.googleapis.com/token', {
//             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//             body: new URLSearchParams({
//               client_id: process.env.OAUTH_CLIENT_ID ?? '',
//               client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
//               grant_type: 'refresh_token',
//               refresh_token: token.refresh_token as string,
//             }),
//             method: 'POST',
//           });

//           const tokens = await response.json();

//           if (!response.ok) throw tokens;

//           return {
//             ...token,
//             access_token: tokens.access_token,
//             expires_at: Date.now() + Number(tokens.expires_in) * 1000,
//             refresh_token: tokens.refresh_token ?? token.refresh_token,
//           };
//         } catch (error) {
//           return { ...token, error: 'RefreshAccessTokenError' as const };
//         }
//       }
//     },
//     async session({ session, token }) {
//       return {
//         ...session,
//         accessToken: token.access_token as string,
//         refreshToken: token.refresh_token as string,
//         accessTokenIssuedAt: token.issued_at as number,
//         accessTokenExpiresAt: token.expires_at as number,
//         dbUserId: token.userId as string,
//       } satisfies EnrichedSession;
//     },
//   },
// } satisfies NextAuthConfig;

// export interface EnrichedSession extends Session {
//   accessToken: string;
//   refreshToken: string;
//   accessTokenExpiresAt: number;
//   accessTokenIssuedAt: number;
//   dbUserId?: string
// }

// export const { handlers, auth, signIn, signOut } = NextAuth(config);


import NextAuth, {type Session, type User} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import { db } from "./lib/db";

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
  }
})