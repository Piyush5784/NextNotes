"use client";
import { PowerIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  const logoutHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Sign out error", error);
    }
  };

  return (
    <div>
      <button
        onClick={logoutHandler}
        className="flex h-[48px] grow items-center justify-center border-purple-200 border dark:border-none gap-2 rounded-md  p-3 text-sm font-medium text-purple-600 hover:bg-purple-700  hover:text-purple-100 md:flex-none md:justify-start md:p-2 md:px-3) w-full"
      >
        <PowerIcon className="w-6" />
        <div className="hidden md:block">Log Out</div>
      </button>
    </div>
  );
};

export default LogoutButton;
