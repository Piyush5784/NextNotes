"use client";

import PrimaryButton from "@/components/custom/PrimaryButton";
import useGetAllNotes from "@/hooks/useGetAllNotes";
import { Note } from "@/types/TsTypes";
import { RefreshCw } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import NoteCard from "./components/NoteCard";
import Loader from "./components/Loader";
export default function Page() {
  const { data: session } = useSession();
  const { notes, isLoading, isError, mutate } = useGetAllNotes(
    session?.user?.email || ""
  );

  console.log(notes);
  const [refreshing, setRefreshing] = useState(false); // Local state for loading

  const handleRefresh = async () => {
    setRefreshing(true);
    mutate();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  // Filter notes to show only those that are not in the trash
  const filteredNotes = notes.filter((note: Note) => !note.Trash);

  return (
    <div className="rounded-md border min-h-screen p-4 pb-10 flex flex-col gap-20">
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-6">My Notes</h1>
          {/* <PrimaryButton disabled={refreshing} onClickEvent={handleRefresh}>
            Refresh
            <RefreshCw
              size={24}
              className={`ml-2 transition-transform ${
                refreshing ? "animate-spin" : ""
              }`}
            />
          </PrimaryButton> */}
        </div>

        {isLoading ? (
          <Loader />
        ) : filteredNotes.length === 0 ? (
          <p className="mb-4">
            You have not created any notes. Create one now!
          </p>
        ) : (
          <div className="flex gap-2 flex-wrap">
            {filteredNotes.map((note: Note) => (
              <div
                key={note.id}
                className="flex bg-gradient-to-tr from-violet-500 via-violet-600 to-indigo-700 text-white border justify-between p-3 border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 ease-in-out w-72"
              >
                <NoteCard note={note} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
