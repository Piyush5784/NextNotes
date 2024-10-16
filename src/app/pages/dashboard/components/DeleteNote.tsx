"use client";
import useGetAllNotes from "@/hooks/useGetAllNotes";
import { BaseUrl } from "@/types/TsTypes";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const DeleteNote = ({ id }: { id: number }) => {
  const { data: session } = useSession();
  const { mutate } = useGetAllNotes(session?.user?.email || "");

  async function handleDelete() {
    if (!id) {
      return toast.error("Invalid note ID");
    }

    await toast.promise(
      axios.post(`${BaseUrl}/api/notes/moveToTrash`, {
        email: session?.user?.email,
        noteId: id,
      }),
      {
        loading: "Moving note to trash...",
        success: "Note moved to trash successfully!",
        error: "Failed to move note to trash.",
      }
    );
    await mutate();
  }

  return (
    <DropdownMenuItem
      onClick={handleDelete}
      className="cursor-pointer text-red-600 hover:bg-red-100 rounded px-2 py-1 transition duration-200"
    >
      Delete
    </DropdownMenuItem>
  );
};

export default DeleteNote;
