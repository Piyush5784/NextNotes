"use client";
import { Button } from "@/components/ui/button";
import useGetAllNotes from "@/hooks/useGetAllNotes";
import { BaseUrl, Note } from "@/types/TsTypes";
import axios from "axios";
import { RotateCcw, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import CustomDialog from "../components/DeleteNoteDialog";

const Page = () => {
  const { data: session } = useSession();
  const [refreshing, setRefreshing] = useState(false);
  const { notes, mutate } = useGetAllNotes(session?.user?.email || "");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await mutate();
    setTimeout(() => {
      setRefreshing(false);
    }, 200);
  };

  const trashNotes: Note[] = notes.filter((note: Note) => note.Trash) || [];

  const ids = trashNotes.map((note) => note.id);

  const handlerDeleteALLNotes = async (id: number | number[]) => {
    await toast.promise(
      axios.post(`${BaseUrl}/api/notes/deleteAllNotes`, {
        email: session?.user?.email,
        idsArray: Array.isArray(id) ? id : [id],
      }),
      {
        loading: "Moving note to trash...",
        success: "Note moved to trash successfully!",
        error: "Failed to move note to trash.",
      }
    );
    handleRefresh();
    setIsDialogOpen(false);
  };

  // Handler to restore notes from trash
  const handlerRestoreNote = async (id: number | number[]) => {
    await toast.promise(
      axios.post(`${BaseUrl}/api/notes/restoreNotes`, {
        email: session?.user?.email,
        idsArray: Array.isArray(id) ? id : [id],
      }),
      {
        loading: "Restoring note...",
        success: "Note restored successfully!",
        error: "Failed to restore note.",
      }
    );
    handleRefresh();
  };

  return (
    <div className="min-h-screen py-10 border-primary">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <h1 className="md:text-4xl text-2xl font-bold text-center mb-12">
            Trash Notes
          </h1>

          <div className="flex md:justify-end gap-10">
            <Button
              onClick={() => setIsDialogOpen(true)}
              disabled={ids.length === 0}
              variant={"destructive"}
              className="bg-red-500 "
            >
              Delete All
            </Button>
          </div>

          <CustomDialog
            setIsDialogOpen={setIsDialogOpen}
            isOpen={isDialogOpen}
            title="Delete All Notes"
            description="Are you sure you want to permanently delete all notes from trash? This action cannot be undone."
            onClose={() => setIsDialogOpen(false)}
            onConfirm={() => handlerDeleteALLNotes(ids)}
          />
        </div>
        {trashNotes.length === 0 ? ( // Check if there are no trash notes
          <div className="flex items-center justify-center min-h-[300px]">
            <p className="text-primary text-lg">No notes found in the trash.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trashNotes.map((note: Note) => (
              <div
                key={note.id}
                className=" border border-primary bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold mb-2">Note Blocks:</h3>{" "}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Button
                        onClick={() => handlerRestoreNote(note.id)}
                        className="bg-purple-400 "
                      >
                        <RotateCcw />
                      </Button>
                      <Button
                        onClick={() => handlerDeleteALLNotes(note.id)}
                        className="bg-red-400 hover:bg-red-400"
                      >
                        <Trash size={"icon"} />
                      </Button>
                    </div>
                  </div>
                </div>
                {note.blocks.map((block, index) => (
                  <div key={index} className="w-60 max-h-10">
                    {block.type === "paragraph" && (
                      <p
                        className=" leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: block.data.text
                            ? block.data.text.slice(0, 50) + "..."
                            : "",
                        }}
                      />
                    )}
                  </div>
                ))}
                <div className="border-t mt-10 pt-2"></div>
                <p className="text-sm  mb-4">
                  Deleted At: {new Date(Number(note.time)).toLocaleString()}
                </p>
                <p className="text-sm mb-4">Version: {note.version}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
