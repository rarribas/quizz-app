// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import {type NextAuthOptions} from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";
import { verifyPassword } from "./hash";
import { findUserByEmail } from "./user";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null>  {
        if(!credentials) return null;
        const user = await findUserByEmail(credentials.email);
        if (!user) return null;
        const isValid = verifyPassword(user.password, credentials.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user?.email || '',
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }, 
    async session({ session, token }:{session: Session; token:JWT}) {
      if (token && session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies Partial<NextAuthOptions>;
