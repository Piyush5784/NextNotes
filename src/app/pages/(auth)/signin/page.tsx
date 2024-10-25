"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormSchema } from "@/schema/zodValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Link } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";
import { FormResponseMessage } from "./component/FormError";

export default function ProfileForm() {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { status, data: session } = useSession();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  function handlePasswordShow(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    return setShowPassword((p) => !p);
  }

  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await signIn("credentials", { ...values, redirect: false });

      if (res?.ok) {
        toast.success("User Successfully logged in");
        setSuccess("User successfully logged in");
        router.push("/pages/dashboard");
      } else if (res?.error) {
        setError(res.error);
      }
    } catch (error) {
      setError("Unexpected error occured");
    }

    form.reset();
    setLoading(false);
  }

  if (status == "authenticated" && session) {
    return router.push("/pages/dashboard");
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center"
      >
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg w-full max-w-lg p-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Login to your account
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Enter your email and password below.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email"
                        {...field}
                        autoFocus
                        autoComplete="email"
                        className="block w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          type={`${showPassword ? "text" : "password"}`}
                          placeholder="Enter your password"
                          autoComplete="password"
                          className="block w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          {...field}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1/2 right-3 transform -translate-y-1/2"
                          onClick={(e) => handlePasswordShow(e)}
                        >
                          {showPassword ? (
                            <FaEyeSlash className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                          ) : (
                            <FaEye className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormResponseMessage type="success" message={success} />
              <FormResponseMessage type="error" message={error} />

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="submit"
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin mx-2" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>

          <div className="flex gap-2 p-5 justify-center text-center items-center">
            Don't have an account?{" "}
            <Button
              onClick={() => router.push("/pages/signup")}
              variant={"link"}
              className="hover:underline text-black dark:text-white"
            >
              Register now
            </Button>
          </div>

          {/* <div className="my-6 flex items-center justify-between">
            <div className="w-full h-px bg-gray-300"></div>
            <span className="mx-4 text-gray-500 dark:text-gray-400">or</span>
            <div className="w-full h-px bg-gray-300"></div>
          </div> */}

          {/* <div className="grid grid-cols-2 gap-4"> */}
          {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-full flex items-center justify-center bg-white text-gray-900 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md py-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600">
                <IconContext.Provider value={{ size: "20" }}>
                  <FcGoogle className="mr-2" />
                </IconContext.Provider>
                Google
              </Button>
            </motion.div> */}

          {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-full flex items-center justify-center bg-white text-gray-900 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md py-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600">
                <IconContext.Provider value={{ size: "20" }}>
                  <IoLogoGithub className="mr-2" />
                </IconContext.Provider>
                GitHub
              </Button>
            </motion.div> */}
          {/* </div> */}
        </div>
      </motion.div>
    </>
  );
}
