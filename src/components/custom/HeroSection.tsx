"use client";
import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
const HeroSection = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center space-y-4 text-center"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
          Capture Your Thoughts, Anytime, Anywhere
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Notes is your digital notebook. Jot down ideas, create to-do lists,
          and organize your life with ease.
        </p>
      </div>
      <div className="space-x-4">
        <Button asChild>
          <Link href={"/pages/dashboard"}>Get Started</Link>
        </Button>

        <Button variant="outline">Learn More</Button>
      </div>
    </motion.div>
  );
};

export default HeroSection;
