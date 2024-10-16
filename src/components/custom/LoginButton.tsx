"use client";
import { slideInFromLeft } from "@/lib/motion";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
const LoginButton = () => {
  const { status } = useSession();
  const router = useRouter();
  return (
    <div>
      <motion.div>
        {status === "authenticated" ? (
          <>
            <Button
              onClick={() => signOut()}
              className="bg-purple-600 hover:bg-purple-800"
            >
              Logout
            </Button>
            <Button
              variant={"outline"}
              className="ml-2 dark:text-white text-black"
              onClick={() => router.push("/pages/dashboard")}
            >
              Dashboard
            </Button>
          </>
        ) : (
          <>
            <div className="flex w-full">
              <div>
                <motion.div
                  onClick={() => router.push("/pages/signin")}
                  variants={slideInFromLeft(1)}
                  className=" py-[6px] space-x-1 button-primary duration-100 cursor-pointer rounded-lg min-w-[100px] text-gray-900 button-primary text-center dark:text-white"
                >
                  Login
                </motion.div>
              </div>
              <Button
                variant="outline"
                className="hidden ml-2 md:inline-flex border border-primary bg-transparent hover:bg-hoverBg hover:border-secondary text-accent hover:text-primary shadow-inner hover:shadow-hoverShadow transition-all duration-300 "
              >
                Dashboard
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default LoginButton;
