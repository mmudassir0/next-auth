"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "./header";
import { Social } from "./social";
import BackButton from "./back-button";

interface CardWraperProps {
  children: React.ReactNode;
  headerlabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const CardWraper = ({
  children,
  headerlabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWraperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerlabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>

      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};

export default CardWraper;
