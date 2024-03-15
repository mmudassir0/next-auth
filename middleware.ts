import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  publicRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req): any => {
  const { nextUrl } = req;
  const isLoggedin = !!req.auth;
  console.log(isLoggedin, "isLogedIn");

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null; // API routes don't need authentication
  }
  if (isAuthRoute) {
    if (isLoggedin) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  if (!isLoggedin && !isPublicRoutes) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  // matcher: ["/auth/login"],
};
