"use client";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react"; // Update the import path if needed.
import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import LoginButton from "./LoginButton";
import { ModeToggle } from "./ThemeSwitcher";
export default function Appbar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="sticky top-0 p-2  border-purple-400 z-50 w-full px-2 border-b-[1px]  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <motion.div
        className="container mx-auto flex h-14 items-center justify-between px-4 md:px-20 "
        initial={{ y: -150 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div>
          <Link className="flex items-center space-x-2" href="/">
            <Pencil className="h-6 w-6" />
            <span className="text-xl font-bold">NextNotes</span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="#features"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Features
          </Link>
          <Link
            href="/pages/feedback"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            About
          </Link>
          <Link
            href="/pages/feedback"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Feedback
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <ModeToggle />
          <div className="hidden md:block">
            <LoginButton />
          </div>

          {/* Mobile Menu Toggle Button */}
          <div
            className="md:hidden"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <FiMenu size={25} />
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <div
        className={`absolute w-[90%] dark:text-black duration-300 ${
          showMenu ? "top-30" : "top-[-500px]"
        }`}
      >
        <div
          className={`flex duration-300 flex-col w-full bg-primary dark:text-white border justify-center items-center shadow-xl relative ${
            showMenu ? "top-0" : "top-[-500px]"
          }  m-4 rounded-3xl p-1`}
        >
          <Link
            href="#features"
            className="p-2 border-b hover:underline text-center "
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="p-2 border-b hover:underline text-center"
          >
            Pricing
          </Link>
          <Link
            href="#about"
            className="p-2 border-b hover:underline text-center"
          >
            About
          </Link>
          <div className="flex p-2">
            <LoginButton />
          </div>
        </div>{" "}
      </div>
    </header>
  );
}
