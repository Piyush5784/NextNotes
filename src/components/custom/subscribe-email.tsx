"use client";
import { BaseUrl } from "@/types/TsTypes";
import { SubscribeEmailSchema } from "@/types/Ztypes";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

// Define the type from the schema
type FormData = z.infer<typeof SubscribeEmailSchema>;

const SignupEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SubscribeEmailSchema),
    mode: "onChange", // Use Zod resolver
  });

  const onSubmit = async (data: FormData) => {
    try {
      await toast.promise(
        axios.post(`${BaseUrl}/api/subscribeEmail`, {
          email: data.email,
        }),
        {
          loading: "Subscribing...", // Message while the promise is pending
          success: "Successfully subscribed!", // Message when the promise is resolved
          error: "Subscription failed. Please try again.", // Message when the promise is rejected
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("Internal server error");
    }
  };

  return (
    <form
      className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        className="flex-1"
        placeholder="Enter your email"
        type="email"
        {...register("email")}
      />
      <Button type="submit" className="px-6 py-3 text-lg font-bold">
        Sign Up
      </Button>{" "}
      <div>
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>
    </form>
  );
};

export default SignupEmail;
