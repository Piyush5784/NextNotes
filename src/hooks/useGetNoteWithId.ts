"use client";
import useSWR, { mutate } from "swr";
import { fetcher } from "./functions";

const useGetAllNotesWithNoteId = (email: string, id: string) => {
  const key =
    id && email ? `/api/notes/getAllNotes?email=${email}&id=${id}` : null;

  const { data, error, isLoading } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: true,
    refreshInterval: 60000,
  });

  // Mutate function to manually revalidate the data
  const refreshNotes = async () => {
    if (key) {
      await mutate(key, async () => {
        const response = await fetcher(key);
        return response;
      });
    }
  };

  return {
    notes: data ? data.notes : [],
    isLoading,
    isError: !!error,
    refreshNotes, // Expose the mutate function
  };
};

export default useGetAllNotesWithNoteId;
