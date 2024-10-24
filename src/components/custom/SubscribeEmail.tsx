"use client";
import { SubscribeEmailSchema } from "@/types/Ztypes";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

// Define the type from the schema
type FormData = z.infer<typeof SubscribeEmailSchema>;

const SubscribeEmail = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SubscribeEmailSchema),
    mode: "onChange", // Use Zod resolver
  });

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitting(true);
      await toast.promise(
        axios.post(`/api/subscribeEmail`, {
          email: data.email,
        }),
        {
          loading: "Subscribing...", // Message while the promise is pending
          success: "Successfully subscribed!", // Message when the promise is resolved
          error: "Subscription failed. Please try again.", // Message when the promise is rejected
        }
      );
      reset();
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      toast.error("Internal server error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Input
          className="flex-1 p-3 md:p-0"
          placeholder="Enter your email"
          type="email"
          {...register("email")}
        />

        <Button
          disabled={submitting}
          type="submit"
          className="inline-flex active:ring-0 active:border-none md:p-3  md:px-5 animate-shimmer items-center justify-center rounded-md  bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50
        md:ml-4
        border text-primary border-primary bg-transparent hover:bg-hoverBg hover:border-secondary  hover:text-primary hover:shadow-hoverShadow transition-all  "
        >
          Subscribe
          <LoaderCircle
            className={clsx("m-2 animate-spin", {
              hidden: !submitting,
            })}
          />
        </Button>
      </div>
      <div className="flex justify-start py-4 px-1">
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>
    </form>
  );
};

export default SubscribeEmail;
