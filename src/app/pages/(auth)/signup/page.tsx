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
import useDebounce from "@/hooks/useDebounce";
import { RegisterFormSchema } from "@/schema/zodValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosResponse } from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";
import { FormResponseMessage } from "../signin/component/FormError";

export default function RegisterPage() {
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [response, setResponse] = useState({ success: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const debouncedUsername = useDebounce(username, 2000);
  const [usernameResponse, setUsernameResponse] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);

  const handlePasswordShow = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((p) => !p);
  };

  useEffect(() => {
    if (debouncedUsername) {
      setUsernameLoading(true);
      const checkUsername = async () => {
        try {
          const res: AxiosResponse = await axios.post(
            "/api/auth/user/checkUsername",
            { username: debouncedUsername }
          );
          if (res.status === 200) {
            setUsernameResponse(res.data.message);
            setUsernameValid(res.data.success); // Assuming the API returns a valid flag
          } else {
            setUsernameResponse("Unexpected response from server.");
            setUsernameValid(false);
          }
        } catch (error) {
          setUsernameResponse("Error checking username.");
          setUsernameValid(false);
        } finally {
          setUsernameLoading(false);
        }
      };

      checkUsername();
    } else {
      setUsernameResponse(""); // Clear response if username is empty
      setUsernameValid(false); // Reset username validity
    }
  }, [debouncedUsername]);

  const onSubmit = async (values: z.infer<typeof RegisterFormSchema>) => {
    if (!usernameValid) {
      toast.error("Please enter a valid username.");
      return;
    }

    setLoading(true);
    try {
      const res: AxiosResponse = await axios.post(
        "/api/auth/user/signup",
        values
      );
      if (res.data.success) {
        setResponse({ success: true, message: res.data.message });
        toast.success("Email successfully sent to your email.");

        let countdown = 3;

        const countdownInterval = setInterval(() => {
          if (countdown > 0) {
            setResponse({
              success: true,
              message: `Redirecting in ${countdown--} seconds...`,
            });
          } else {
            clearInterval(countdownInterval);
            router.push(`/pages/verify-otp/${values.username}`);
          }
        }, 1000);
      } else {
        setResponse({ success: false, message: res.data.message });
      }
    } catch (error) {
      setResponse({ success: false, message: "Unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

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
            Register a new account
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Enter your username, email, and password below.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Username
                    </FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          placeholder="Enter Username"
                          {...field}
                          onChange={(e) => {
                            setUsername(e.target.value);
                            field.onChange(e);
                          }}
                          type="text"
                          className="block w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        {usernameLoading ? (
                          <AiOutlineLoading3Quarters className="animate-spin mx-2" />
                        ) : (
                          <p
                            className={`text-sm ${
                              usernameValid ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {usernameResponse}
                          </p>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        type="email"
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
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          autoComplete="password"
                          className="block w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          {...field}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1/2 right-3 transform -translate-y-1/2"
                          onClick={handlePasswordShow}
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
              <FormResponseMessage
                type={response.success ? "success" : "error"}
                message={response.message}
              />
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="submit"
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition-all duration-300"
                  disabled={loading || response.success}
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin mx-2" />
                  ) : (
                    "Register"
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>

          <div className="flex gap-2 p-5 justify-center text-center items-center">
            Already have an account?{" "}
            <Button
              onClick={() => router.push("/pages/signin")}
              variant={"link"}
              className="hover:underline text-black dark:text-white"
            >
              Login now
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
