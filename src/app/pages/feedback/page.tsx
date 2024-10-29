"use client";
import Appbar from "@/components/custom/Appbar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { sendFeedbackEmail } from "@/helpers/sendFeedbackEmail";
import { SelectOptions } from "@/resources/SelectOptions";
import { feedbackForm } from "@/types/Ztypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as z from "zod";

export default function MyForm() {
  const { data: session, status } = useSession();
  const form = useForm<z.infer<typeof feedbackForm>>({
    resolver: zodResolver(feedbackForm),
    defaultValues: {
      tag: "",
      Description: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof feedbackForm>) {
    setLoading(true);
    try {
      if (status == "unauthenticated") {
        toast.error("Please login to proceed ");
        return;
      }
      const res = await sendFeedbackEmail(values, session?.user.email);
      if (res.success) {
        form.reset();
        toast.success("Your response is successfully recorded");
        return router.push("/");
      }
    } catch (error) {
      console.error("Form submission error", error);
      return toast.error("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Appbar />
      <div className="flex justify-center items-center">
        <div className="h-screen w-[300px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 max-w-3xl mx-auto py-10"
            >
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Please tag"
                            className="text-white"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SelectOptions.map((option, index) => (
                          <SelectItem key={index} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the type of issue</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Bug description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Explain your issue or enhancemnent
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant={"outline"}>
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin mx-2" />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>{" "}
        </div>
      </div>
    </>
  );
}
