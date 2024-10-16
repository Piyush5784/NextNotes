import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckSquare,
  Clock,
  FileText,
  Pencil,
  RefreshCw,
  Share2,
} from "lucide-react";
import Link from "next/link";
import HeroSection from "./HeroSection";
import SignupEmail from "./subscribe-email";

export default function Home() {
  return (
    <>
      <div className="absolute top-10 left-20 h-96 w-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-indigo-400 to-purple-600"></div>
      <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full opacity-15 blur-3xl bg-gradient-to-r from-purple-400 to-pink-600"></div>
      <div className="flex flex-col h-screen">
        <main className="flex-1">
          {/* Hero Section */}
          {/* <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 h-screen">
            <div className="container px-4 md:px-6">
              <HeroSection />
            </div>
          </section> */}

          {/* Features Section */}
          <section
            id="features"
            className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b  from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900"
          >
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                Features
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center space-y-2 border-gray-300 dark:border-gray-800 p-6 rounded-lg bg-white shadow-md dark:bg-gray-800">
                  <Pencil className="h-8 w-8 mb-2 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-xl font-bold">Easy Note-Taking</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Quickly jot down your thoughts with our intuitive interface.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-300 dark:border-gray-800 p-6 rounded-lg bg-white shadow-md dark:bg-gray-800">
                  <CheckSquare className="h-8 w-8 mb-2 text-green-600 dark:text-green-400" />
                  <h3 className="text-xl font-bold">Task Management</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Create and manage to-do lists to stay organized.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-300 dark:border-gray-800 p-6 rounded-lg bg-white shadow-md dark:bg-gray-800">
                  <FileText className="h-8 w-8 mb-2 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-bold">Rich Text Editor</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Create your notes with rich text formatting options.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-300 dark:border-gray-800 p-6 rounded-lg bg-white shadow-md dark:bg-gray-800">
                  <RefreshCw className="h-8 w-8 mb-2 text-orange-600 dark:text-orange-400" />
                  <h3 className="text-xl font-bold">Sync Across Devices</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Access your notes from any device, anytime.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-300 dark:border-gray-800 p-6 rounded-lg bg-white shadow-md dark:bg-gray-800">
                  <Clock className="h-8 w-8 mb-2 text-red-600 dark:text-red-400" />
                  <h3 className="text-xl font-bold">Unlimited Notes</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Create as many notes as you need, without limits.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section
            id="cta"
            className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-indigo-600 to-purple-600 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 text-white"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-6 text-center">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Start Organizing Your Thoughts Today
                </h2>
                <p className="max-w-2xl text-lg md:text-xl">
                  Join thousands of users who have transformed their note-taking
                  experience with NextNotes.
                </p>
                <div className="w-full max-w-md space-y-4">
                  <SignupEmail />
                  <p className="text-sm text-gray-200">
                    By signing up, you agree to our{" "}
                    <Link className="underline underline-offset-2" href="#">
                      Terms & Conditions
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-8 w-full bg-gray-900 text-gray-400">
          <div className="container flex flex-col items-center space-y-2 md:flex-row md:justify-between md:space-y-0">
            <p className="text-sm px-2">
              2024 NextNotes made by{" "}
              <Link
                href="https://x.com/Piyush5784"
                target="_blank"
                className="hover:underline"
              >
                Piyush
              </Link>
              .
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
