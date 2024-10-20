"use client";
import useSWR, { mutate } from "swr";
import { fetcher } from "./functions";

const useGetAllNotes = (email?: string) => {
  const username = email;

  const { data, error, isLoading } = useSWR(
    username ? `/api/notes/getAllNotes?email=${username}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 60000,
      shouldRetryOnError: true, // Retry on failure
    }
  );

  async function RefreshData() {
    await mutate(`/api/notes/getAllNotes?email=${email}`, async () => {
      const response = await fetcher(`/api/notes/getAllNotes?email=${email}`);
      return response;
    });
  }
  return {
    notes: data ? data.notes : [],
    isLoading,
    isError: !!error,
    mutate: RefreshData,
  };
};

export default useGetAllNotes;
