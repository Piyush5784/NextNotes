"use client";
import { Button } from "@/components/ui/button";
import useGetAllNotes from "@/hooks/useGetAllNotes";
import { Note } from "@/types/TsTypes";
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

  const handlerDeleteALLNotes = async (id: number | number[]) => {
    await toast.promise(
      axios.post(`/api/notes/deleteAllNotes`, {
        idsArray: Array.isArray(id) ? id : [id],
      }),
      {
        loading: "Deleting note...",
        success: "Note deleted successfully!",
        error: "Failed to delete note.",
      }
    );
    handleRefresh();
    setIsDialogOpen(false);
  };

  const handlerRestoreNote = async (id: number | number[]) => {
    await toast.promise(
      axios.post(`/api/notes/restoreNotes`, {
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
  if (notes) {
    const trashNotes: Note[] = notes.filter((note: Note) => note.Trash) || [];
    const ids = trashNotes.map((note) => note.id);
    return (
      <div className="min-h-screen py-10 dark:bg-gray-950  bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="md:text-4xl text-2xl font-bold text-gray-900 dark:text-white">
              Trash Notes
            </h1>

            <div className="flex gap-4">
              {/* <Button
              onClick={handleRefresh}
              className={`flex items-center justify-center px-4 py-2 text-white rounded-md shadow-md ${
                refreshing ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              } transition-all duration-300`}
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </Button> */}
              <Button
                onClick={() => setIsDialogOpen(true)}
                disabled={ids.length === 0}
                variant={"destructive"}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300"
              >
                Delete All
              </Button>
            </div>

            <CustomDialog
              setIsDialogOpen={setIsDialogOpen}
              isOpen={isDialogOpen}
              title="Delete All Notes"
              description="Are you sure you want to permanently delete all notes from the trash? This action cannot be undone."
              onClose={() => setIsDialogOpen(false)}
              onConfirm={() => handlerDeleteALLNotes(ids)}
            />
          </div>

          {trashNotes.length === 0 ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <p className="text-gray-500 text-lg">
                No notes found in the trash.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trashNotes.map((note: Note) => (
                <div
                  key={note.id}
                  className="border border-gray-200 bg-white dark:text-white bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 "
                >
                  <div className="flex justify-between mb-4">
                    <h3 className="font-semibold text-lg text-gray-900">
                      Note Blocks
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handlerRestoreNote(note.id)}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded-md shadow-md"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handlerDeleteALLNotes(note.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md shadow-md"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {note.blocks.map((block, index) => (
                    <div key={index} className="mb-2 text-purple-50">
                      {block.type === "paragraph" && (
                        <p
                          className="leading-relaxed truncate"
                          dangerouslySetInnerHTML={{
                            __html: block.data.text
                              ? block.data.text.slice(0, 50) + "..."
                              : "",
                          }}
                        />
                      )}
                    </div>
                  ))}

                  <div className="border-t border-gray-200 mt-4 pt-2">
                    <p className="text-sm text-purple-50">
                      Deleted At: {new Date(Number(note.time)).toLocaleString()}
                    </p>
                    <p className="text-sm text-purple-50">
                      Version: {note.version}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
};
export default Page;
