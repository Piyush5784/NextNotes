"use client";
import Appbar from "@/components/custom/Appbar";
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
import { formSchema } from "@/schema/zodValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import { z } from "zod";

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const { status } = useSession();

  const router = useRouter();
  if (status == "authenticated") {
    return router.push("/pages/dashboard");
  }
  function googleSignInHandler(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    return signIn("google");
  }

  function handlePasswordShow(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    return setShowPassword((p) => !p);
  }

  function githubSignInHandler(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    return signIn("google");
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await signIn("credentials", values);
      if (res == undefined) {
        toast.error("Failed to login");
      } else {
        toast.success("Login Successfull");
      }
    } catch (error) {
      toast.error("falied to login");
    }
  }

  return (
    <>
      <Appbar />
      <div className="dark:bg-black dark:text-white flex items-center h-screen justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="border border-gray-800 m-10 p-10 lg:px-20 lg:py-20 rounded-lg"
        >
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground text-black dark:text-white">
            Create an account
          </h1>
          <p className="text-gray-400 p-3 text-sm text-center">
            Enter your email and password below to create an account
          </p>
          <div className="pt-4 ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter email"
                          {...field}
                          autoFocus
                          autoComplete="email"
                          className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="password"
                            type={`${showPassword ? "text" : "password"}`}
                            placeholder="Enter your password"
                            autoComplete="password"
                            className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                            {...field}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-1/2 right-2 -translate-y-1/2"
                            onClick={(e) => handlePasswordShow(e)}
                          >
                            {showPassword ? (
                              <FaEyeSlash className="h-5 w-5" />
                            ) : (
                              <FaEye className="h-5 w-5" />
                            )}
                            <span className="sr-only">
                              Toggle password visibility
                            </span>
                          </Button>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center  justify-center">
                  <Button
                    type="submit"
                    variant={"outline"}
                    className="hidden md:inline-flex border border-primary bg-transparent mb-3 hover:bg-purple-400  hover:border-secondary text-purple-200 hover:text-white shadow-inner hover:shadow-hoverShadow transition-all duration-300 w-full"
                  >
                    Login
                  </Button>
                </div>
              </form>
            </Form>
            <div className="flex items-center justify-center ">
              <div className="w-[23%] border h-0"></div>
              <div className="px-2">or continue with</div>
              <div className="w-[22%] border h-0"></div>
            </div>
            <div className="flex gap-10 opactity-10">
              <Button
                className=" mt-3 border border-gray-700 flex w-full items-center justify-center rounded-md  border-input bg-white dark:bg-white px-3 py-2 text-sm font-semibold text-muted-foreground text-black shadow-sm transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                // onClick={(e) => googleSignInHandler(e)}
              >
                <IconContext.Provider value={{ size: "25" }}>
                  <div className="px-2">
                    <FcGoogle />
                  </div>
                </IconContext.Provider>
                coming soon
              </Button>
              <Button
                className="mt-3 border border-gray-700 flex w-full items-center justify-center rounded-md border-input bg-white dark:bg-white px-3 py-2 text-sm font-semibold text-muted-foreground text-black shadow-sm transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                // onClick={(e) => githubSignInHandler(e)}
              >
                <IconContext.Provider value={{ size: "25" }}>
                  <div className="px-2">
                    <IoLogoGithub />
                  </div>
                </IconContext.Provider>
                coming soon
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
  // }

  // import Link from "next/link";
  // import { Label } from "@/components/ui/label";
  // import { Input } from "@/components/ui/input";
  // import { Checkbox } from "@/components/ui/checkbox";
  // import { Button } from "@/components/ui/button";
  // import { JSX, SVGProps } from "react";

  // export default function Component() {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
  //       <div className="w-full max-w-md space-y-8">
  //         <div>
  //           <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
  //             Sign in to your account
  //           </h2>
  //           <p className="mt-2 text-center text-sm text-muted-foreground">
  //             Or{" "}
  //             <Link
  //               href="#"
  //               className="font-medium text-primary hover:text-primary/90"
  //               prefetch={false}
  //             >
  //               sign up for a new account
  //             </Link>
  //           </p>
  //         </div>
  //         <form className="space-y-6" action="#" method="POST">
  //           <div>
  //             <Label htmlFor="email" className="sr-only">
  //               Email address
  //             </Label>
  //             <Input
  //               id="email"
  //               name="email"
  //               type="email"
  //               autoComplete="email"
  //               required
  //               placeholder="Email address"
  //               className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
  //             />
  //           </div>
  //           <div>
  //             <Label htmlFor="password" className="sr-only">
  //               Password
  //             </Label>
  //             <Input
  //               id="password"
  //               name="password"
  //               type="password"
  //               autoComplete="current-password"
  //               required
  //               placeholder="Password"
  //               className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
  //             />
  //           </div>
  //           <div className="flex items-center justify-between">
  //             <div className="flex items-center">
  //               <Checkbox
  //                 id="remember-me"
  //                 name="remember-me"
  //                 className="h-4 w-4 rounded"
  //               />
  //               <Label
  //                 htmlFor="remember-me"
  //                 className="ml-2 block text-sm text-muted-foreground"
  //               >
  //                 Remember me
  //               </Label>
  //             </div>
  //             <div className="text-sm">
  //               <Link
  //                 href="#"
  //                 className="font-medium text-primary hover:text-primary/90"
  //                 prefetch={false}
  //               >
  //                 Forgot your password?
  //               </Link>
  //             </div>
  //           </div>
  //           <div>
  //             <Button
  //               type="submit"
  //               className="flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
  //             >
  //               Sign in
  //             </Button>
  //           </div>
  //         </form>
  //         <div className="flex items-center justify-center space-x-4">
  //           <Button
  //             variant="outline"
  //             className="flex items-center justify-center"
  //           >
  //             <ChromeIcon className="h-5 w-5 mr-2" />
  //             Sign in with Google
  //           </Button>
  //           <Button
  //             variant="outline"
  //             className="flex items-center justify-center"
  //           >
  //             <GitlabIcon className="h-5 w-5 mr-2" />
  //             Sign in with GitHub
  //           </Button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}
