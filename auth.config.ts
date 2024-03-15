import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

import bcryptjs from "bcryptjs";
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // Email and Password Signin Method
    Credentials({
      async authorize(credentials) {
        const validateField = LoginSchema.safeParse(credentials);
        if (validateField.success) {
          const { email, password } = validateField.data;
          const user = await getUserByEmail(email);
          console.log(user, "user");
          if (!user || !user.password) {
            return null;
          }

          //   const passwordMatch = await bcrypt.compare(password, user.password);
          const passwordMatch = await bcryptjs.compare(password, user.password);
          console.log(passwordMatch, "password");
          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
