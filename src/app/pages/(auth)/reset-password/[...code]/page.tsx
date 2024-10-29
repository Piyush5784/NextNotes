"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { motion } from "framer-motion";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as z from "zod";
import { FormResponseMessage } from "../../signin/component/FormError";
import Timer from "../../verify-otp/[username]/components/Timer";

const formSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirm_password: z
    .string()
    .min(6, "Confirmation password must be at least 6 characters"),
});

export default function MyForm() {
  const searchParams = useSearchParams();
  const { code } = useParams();
  const email = searchParams.get("email");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ success: false, message: "" });

  function handlePasswordShow(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowPassword(!showPassword);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!(values.confirm_password === values.password)) {
      setResponse({ success: false, message: "Password mismatched" });
      return toast.error("Password mismatched");
    }
    setLoading(true);
    try {
      const res = await axios.post(`/api/auth/user/change-password`, {
        email,
        code: code[0],
        password: values.password,
      });
      if (res.status === 200) {
        setResponse({ success: res.data.success, message: res.data.message });
        toast.success(res.data.message);
        form.reset();
        let countdown = 3;

        const countdownInterval = setInterval(() => {
          if (countdown > 0) {
            setResponse({
              success: true,
              message: `Redirecting in ${countdown--} seconds...`,
            });
          } else {
            clearInterval(countdownInterval);
            router.push(`/pages/signin`);
          }
        }, 1000);
      } else {
        setResponse({ success: false, message: res.data.message });
      }
    } catch (error: any) {
      console.error(error.response.data);
      setResponse({
        success: false,
        message: "Failed to reset password. Please retry",
      });
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 50, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center"
    >
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg w-full max-w-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Reset Password
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Enter your new password below.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
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
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        disabled={loading}
                        className="block w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
                  <FormDescription>Enter your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Confirm password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Confirm password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        disabled={loading}
                        className="block w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                      <Timer duration={300} />
                    </div>
                  </FormControl>
                  <FormDescription>Confirm your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormResponseMessage
              type={response.success ? "success" : "error"}
              message={response.message}
            />

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="submit"
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin mx-2" />
                ) : (
                  "Submit"
                )}
              </Button>
            </motion.div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}
