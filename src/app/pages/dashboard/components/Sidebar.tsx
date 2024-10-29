import LogoutButton from "@/components/custom/LogoutButton";
import { ModeToggle } from "@/components/custom/ThemeSwitcher";
import Link from "next/link";
import { GrLinkUp } from "react-icons/gr";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";
import { Button } from "@/components/ui/button";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 border">
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
        <Link href={"/pages/feedback"}>
          <Button className="flex h-[48px] grow items-center justify-center border-purple-200 border dark:border-none gap-2 rounded-md  p-3 text-sm font-medium text-purple-600 bg-transparent   hover:bg-purple-700  hover:text-purple-100 md:flex-none md:justify-start md:p-2 md:px-3) w-full">
            <GrLinkUp />
            <div className="hidden md:block">Feedback</div>
          </Button>
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
}
