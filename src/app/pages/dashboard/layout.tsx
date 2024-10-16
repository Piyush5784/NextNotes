"use client";
import { useSession } from "next-auth/react";
import SideNav from "./components/Sidebar";
import Skeleton from "./components/Skeleton";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Skeleton />;
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-4 md:overflow-y-auto ">{children}</div>
    </div>
  );
}
