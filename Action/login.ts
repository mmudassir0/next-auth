"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { generateVerificationToken } from "@/lib/token";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateField = LoginSchema.safeParse(values);
  if (!validateField.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validateField.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials" };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = generateVerificationToken(existingUser.email);
    await sendVerificationEmail(
      (
        await verificationToken
      ).email,
      (
        await verificationToken
      ).token
    );
    return { success: "Confirmation email sent!" };
  }
  try {
    const data = await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    console.log(data, "signin data");
    // return { success: "Email sent" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "invalid credentials" };
        default:
          return { error: `something went wrong! ${error}` };
      }
    }
    throw error;
  }
};
