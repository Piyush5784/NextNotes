"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const ErrorContent = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Unexpected error occurred";
  const router = useRouter();

  return (
    <div className="h-screen flex items-center flex-col pt-20">
      <p className="text-2xl flex flex-wrap text-red-600">{error}</p>
      <p>Please try again</p>
      <div className="pt-5">
        <Button
          className="w-full px-4 py-2 hover:scale-125 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition-all duration-300"
          onClick={() => router.push("/pages/signin")}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

const ErrorPage = () => (
  <Suspense fallback={<div className="text-center pt-20">Loading...</div>}>
    <ErrorContent />
  </Suspense>
);

export default ErrorPage;
