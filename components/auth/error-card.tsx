import { Header } from "./header";
import BackButton from "./back-button";
import { Card, CardFooter, CardHeader } from "../ui/card";
import CardWraper from "./card-wraper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
  return (
    <CardWraper
      headerlabel="Oops SomeThing went wrong"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <div className=" w-full flex items-center justify-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWraper>
  );
};
