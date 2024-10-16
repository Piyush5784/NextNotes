"use client";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";
import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";
import Link from "next/link";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="relative h-screen text-gray-900 flex flex-row items-center justify-center px-20 w-full z-[20]"
    >
      {/* Background Grid */}
      <div className="absolute inset-0  bg-[url('/gridLines.jpg')] bg-cover opacity-5 z-[-1]" />
      {/* <div className="absolute inset-0 dark:bg-grid-white/[0.06] bg-grid-black/[0.04] [mask-image:linear-gradient(to_bottom,white_5%,transparent_20%)] pointer-events-none select-none"></div> */}
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff]  mr-[10px] h-5 w-5" />
          <h1 className=" text-[13px] dark:text-[#b49bff] text-purple-950">
            Easy Note-Taking
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col dark:text-white gap-6 mt-6 text-6xl font-bold  max-w-[600px] w-auto h-auto"
        >
          <span>
            Capture Your
            <span className="text-transparent space-x-1 bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
              Thoughts,
            </span>
            Anytime, Anywhere
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          NextNotes is your digital notebook. Note down your ideas, create to-do
          lists, and organize your life with ease.
        </motion.p>
        <Link href={"/pages/signin"}>
          <motion.div
            variants={slideInFromLeft(1)}
            className="py-2 text-gray-900 button-primary text-center dark:text-white cursor-pointer rounded-lg max-w-[200px]"
          >
            Try it now!
          </motion.div>
        </Link>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full opacity-15 blur-3xl bg-gradient-to-r from-purple-600 to-blue-600"></div>
        {/* <div className="absolute right-1 bottom-[33rem] rounded-full h-[5rem] w-[42rem] opacity-50 blur-3xl   bg-gradient-to-r from-purple-600 to-blue-600"></div> */}
        <video
          autoPlay
          muted
          className="w-full h-auto border border-gradient-to-r from-purple-600 to-blue-600  rounded-lg"
        >
          <source src="/Demo.mp4" type="video/mp4" />
        </video>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
