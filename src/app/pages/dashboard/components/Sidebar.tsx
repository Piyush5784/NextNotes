import LogoutButton from "@/components/custom/LogoutButton";
import { ModeToggle } from "@/components/custom/ThemeSwitcher";
import Link from "next/link";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="mb-2 h-24 flex flex-col justify-between rounded-md bg-purple-700 p-4 md:h-40">
        <div className="flex items-center justify-between space-x-2 text-white">
          <Link href="/" className="text-xl font-bold">
            NextNotes
          </Link>
          <ModeToggle />
        </div>
        <UserInfo />
      </div>

      <div className="flex grow md:flex-col justify-between mt-4 space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <LogoutButton />
      </div>
    </div>
  );
}
