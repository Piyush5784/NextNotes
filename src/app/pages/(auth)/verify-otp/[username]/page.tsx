"use client";

import Appbar from "@/components/custom/Appbar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { OtpValidationSchema } from "@/schema/zodValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosResponse } from "axios";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";
import { FormResponseMessage } from "../../signin/component/FormError";

const VerifyCodePage = () => {
  const { username } = useParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof OtpValidationSchema>>({
    resolver: zodResolver(OtpValidationSchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  const [response, setResponse] = useState({ success: false, message: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof OtpValidationSchema>) => {
    setLoading(true);
    try {
      const res: AxiosResponse = await axios.post("/api/auth/verify-code", {
        username,
        code: values.otp,
      });
      if (res.data.success) {
        setResponse({ success: res.data.success, message: res.data.message });
        let countdown = 3;
        const countdownInterval = setInterval(() => {
          if (countdown > 0) {
            setResponse({
              success: true,
              message: `Redirecting to login ${countdown--} seconds...`,
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
      if (error) {
        setResponse(error.response.data);
      }
      setResponse({ success: false, message: "Unexpected error" });
    }
    setLoading(false);
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center"
      >
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg w-[90%] max-w-md p-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Enter you otp
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Enter your code, which is send to your email.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center justify-center">
                        <InputOTP
                          maxLength={6}
                          {...field}
                          disabled={loading}
                          className="flex items-center justify-center"
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>

                      {/* <Input
                        placeholder="Enter Otp"
                        {...field}
                        autoFocus
                        autoComplete="otp"
                        type="number"
                        className="block w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      /> */}
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
                className="flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="submit"
                  className=" w-full px-4 py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition-all duration-300"
                  disabled={loading || response.success}
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin mx-2" />
                  ) : (
                    "Verify"
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </div>
      </motion.div>
    </>
  );
};

export default VerifyCodePage;
