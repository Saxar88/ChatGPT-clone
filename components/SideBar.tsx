"use client";

import { signOut, useSession } from "next-auth/react";
import NewChat from "./NewChat";

function SideBar() {
  const { data: session } = useSession();

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat />
        </div>
      </div>
      {session && (
        <img
          src={session.user?.image!}
          alt="profile picture"
          onClick={() => {
            signOut();
          }}
          className="h-12 w-12 mx-auto mb-2 rounded-full cursor-pointer hover:opacity-50"
        />
      )}
    </div>
  );
}

export default SideBar;
