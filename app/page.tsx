import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import LoginButton from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-sky-700 ">
      <div className="spacey-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold drop-shadow-md text-white",
            font.className
          )}
        >
          🔐Auth
        </h1>
        <p className="text-white text-lg">
          A simple next authentication service
        </p>
        <div>
          <LoginButton>
            <Button variant={"secondary"} size={"lg"}>
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
