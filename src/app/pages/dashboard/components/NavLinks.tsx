"use client";
import clsx from "clsx";
import { HomeIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsQuestionSquareFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";
const links = [
  { name: "Create", href: "/pages/dashboard/create", icon: PencilIcon },
  { name: "Home", href: "/pages/dashboard", icon: HomeIcon },
  // { name: "Favorite", href: "/pages/dashboard/favorites", icon: FaStar },
  { name: "Trash", href: "/pages/dashboard/trash", icon: FaTrashAlt },
  { name: "Music", href: "/pages/dashboard/music", icon: SiApplemusic },
  {
    name: "Questions",
    href: "/pages/dashboard/questions",
    icon: BsQuestionSquareFill,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              `flex h-[48px] grow items-center justify-center border-purple-200 border dark:border-none gap-2 rounded-md  p-3 text-sm font-medium  hover:bg-purple-700  hover:text-purple-100 md:flex-none md:justify-start md:p-2 md:px-3)`,
              {
                "bg-purple-700 text-purple-100": pathname === link.href,
                "text-purple-600": !(pathname === link.href),
                "mt-3": true,
              }
            )}
          >
            <LinkIcon className="w-6" size={20} />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
