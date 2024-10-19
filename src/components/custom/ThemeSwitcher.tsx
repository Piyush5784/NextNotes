"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  // Function to switch the theme
  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleTheme = () => {
    //@ts-ignore
    if (document.startViewTransition) {
      //@ts-ignore
      document.startViewTransition(switchTheme);
    } else {
      switchTheme();
    }
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="relative rounded-full bg-white text-purple-950 border hover:border-purple-950 hover:bg-primary"
    >
      <motion.div
        key="moon"
        initial={{
          rotate: theme === "dark" ? 0 : 90,
          scale: theme === "dark" ? 1 : 0,
        }}
        animate={{
          rotate: theme === "dark" ? 0 : 90,
          scale: theme === "dark" ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
      </motion.div>

      <motion.div
        key="sun"
        initial={{
          rotate: theme === "dark" ? 90 : 0,
          scale: theme === "dark" ? 0 : 1,
        }}
        animate={{
          rotate: theme === "dark" ? 90 : 0,
          scale: theme === "dark" ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="absolute"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem]" />
      </motion.div>

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
