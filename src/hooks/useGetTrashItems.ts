"use client";
import useSWR from "swr";
import { fetcher } from "./functions";
import { useSession } from "next-auth/react";

const useGetTrashItems = () => {
  const { data: session, status } = useSession();
  const email = session?.user?.email;

  const { data, error, isLoading } = useSWR(
    email ? `/api/notes/moveToTrash?email=${email}` : null,
    fetcher,
    {
      shouldRetryOnError: true, // Retry on failure
    }
  );

  return {
    trashNotes: data ? data.TrashNotes : [],
    isLoading: status === "loading" || isLoading, // Handle session loading state
    isError: !!error,
    error, // Return error for debugging or displaying error messages
  };
};

export default useGetTrashItems;
