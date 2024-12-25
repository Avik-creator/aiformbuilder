// import NextAuth, {type Session, type User} from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import {DrizzleAdapter} from "@auth/drizzle-adapter";
// import { db } from "./lib/db";

// declare module "next-auth" {
//   interface Session {
//     accessToken?: string;
//   }
// }

// export const {
//     handlers,
//     auth,
//     signIn,
//     signOut,
//   } = NextAuth({
//     adapter: DrizzleAdapter(db),
//     providers: [
//       GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         authorization: {
//           params: {
//             scope: "https://www.googleapis.com/auth/forms.body openid email profile",
//           },
//         },
//       }),
//     ],

//     callbacks: {
//       jwt: ({token, user, account, profile})=> {
//         console.log({token,user,account,profile})
//         if (account?.accessToken) {
//           token.accessToken = account.accessToken;
//         }
//         return token;
//       },
//       async session({ session, user, token }: { session: Session; user?: User, token: JWTToken }) {
//         if (user && session?.user) {
//           session.user.id = user.id;
//         }
//         return session;
//       },
//     },
//     }
//   );

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import { db } from "./lib/db";
import type { NextAuthConfig, Session } from 'next-auth';

export const config = {
  theme: {
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png',
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      
      authorization: {
        params: {
          access_type: 'offline',
          prompt: 'consent',
          scope: [
            'https://www.googleapis.com/auth/forms.body openid email profile'

          ].join(' '),
          response: 'code',
        },
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      return !!auth;
    },
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          access_token: account.access_token,
          issued_at: Date.now(),
          expires_at: Date.now() + Number(account.expires_in) * 1000, // 3600 seconds
          refresh_token: account.refresh_token,
        };
      } else if (Date.now() < Number(token.expires_at)) {
        return token;
      } else {

        try {
          const response = await fetch('https://oauth2.googleapis.com/token', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: process.env.OAUTH_CLIENT_ID ?? '',
              client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
              grant_type: 'refresh_token',
              refresh_token: token.refresh_token as string, // Type assertion
            }),
            method: 'POST',
          });

          const tokens = await response.json();

          if (!response.ok) throw tokens;

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at: Date.now() + Number(tokens.expires_in) * 1000,
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          }; // updated inside our session-token cookie
        } catch (error) {

          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: 'RefreshAccessTokenError' as const };
        }
      }
    },
    async session({ session, token }) {

      // This will be accessible in the client side using useSession hook
      // So becareful what you return here. Don't return sensitive data.
      // The auth() function should return jwt response but instead it returns
      // the session object. This is a bug in next-auth.
      // Follow this bug https://github.com/nextauthjs/next-auth/issues/9329
      return {
        ...session,
        accessToken: String(token.access_token),
        refreshToken: String(token.refresh_token),
        accessTokenIssuedAt: Number(token.issued_at),
        accessTokenExpiresAt: Number(token.expires_at),
      } satisfies EnrichedSession;
    },
  },
} satisfies NextAuthConfig;

export interface EnrichedSession extends Session {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  accessTokenIssuedAt: number;
}

export const { handlers, auth, signIn, signOut } = NextAuth(config);