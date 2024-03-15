import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";
import { JWT } from "@auth/core/jwt";
import { UserRole } from "@prisma/client";
declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}
declare module "@auth/core/jwt" {
  interface JWT {
    role: "ADMIN" | "USER";
  }
}
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }): Promise<any> {
      if (account?.provider !== "credentials") {
        return true;
      }
      const existingUser = await getUserById(user.id as string);
      // prevent signin without verification
      if (!existingUser?.emailVerified) {
        return false;
      }
      return true;
    },
    async session({ session, token }) {
      console.log(token, "session token");
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as "ADMIN" | "USER";
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  // secret: "m1eQ7RkJ5kqdQ//r7xMKkxCrGii3C7/SZZYsHOwQf1A=",
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  ...authConfig,
});
