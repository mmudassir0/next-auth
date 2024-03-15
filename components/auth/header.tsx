import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

interface HeaderProps {
  label: string;
}
interface Data {
  isClicked: boolean;
}
export const Header = ({ label }: HeaderProps) => {
  console.log();
  return (
    <div className="flex flex-col w-full gap-y-2 items-center justify-center">
      <h1
        className={cn("text-4xl font-semibold drop-shadow-md", font.className)}
      >
        🔐Auth
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
