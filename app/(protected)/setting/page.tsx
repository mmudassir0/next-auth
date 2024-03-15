import { auth, signOut } from "@/auth";
import React from "react";

const SettingPage = async () => {
  const session = await auth();

  return (
    <div>
      SettingPage
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">SignOut</button>
      </form>
    </div>
  );
};

export default SettingPage;
