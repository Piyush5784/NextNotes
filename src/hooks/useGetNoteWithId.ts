"use client";
import useSWR from "swr";
import { fetcher } from "./functions";

const useGetAllNotesWithNoteId = (email: string, id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    id && email ? `/api/notes/getAllNotes?email=${email}&id=${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false, // Improve performance by not refetching when the window is focused
      dedupingInterval: 60000, // Prevent multiple requests within a short time
      shouldRetryOnError: true, // Retry on failure
    }
  );

  return {
    notes: data ? data.notes : [],
    isLoading,
    isError: !!error,
  };
};

export default useGetAllNotesWithNoteId;
