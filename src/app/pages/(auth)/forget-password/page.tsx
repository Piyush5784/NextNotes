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
import { resetEmailSchema } from "@/schema/zodValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as z from "zod";
import { FormResponseMessage } from "../signin/component/FormError";

export default function MyForm() {
  const form = useForm<z.infer<typeof resetEmailSchema>>({
    resolver: zodResolver(resetEmailSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const [response, setResponse] = useState({ success: false, message: "" });
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof resetEmailSchema>) {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/user/forget-password", {
        email: values.email,
      });
      console.log(res);
      if (res.status === 200) {
        setResponse({ success: res.data.success, message: res.data.message });
        toast.success(res.data.message);
      } else {
        setResponse({ success: false, message: res.data.message });
      }
    } catch (error) {
      console.error(error);
      setResponse({
        success: false,
        message: "Failed to request password update. Please retry",
      });
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center"
    >
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg w-full max-w-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Forget Password
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Enter your email address to receive a reset link.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
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
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                      autoFocus
                      disabled={loading}
                      autoComplete="email"
                      className="block w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 dark:text-gray-400">
                    Enter a valid email address.
                  </FormDescription>
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
