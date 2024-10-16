"use client";

import { User } from "lucide-react";
import { useSession } from "next-auth/react";

const UserInfo = () => {
  const { data: session, status } = useSession();
  return (
    <div className="text-sm">
      <div className=" flex  text-white space-x-2 items-center">
        <div>
          <User />
        </div>
        {status === "authenticated" && <p> {session?.user?.email}</p>}
      </div>
    </div>
  );
};

export default UserInfo;
