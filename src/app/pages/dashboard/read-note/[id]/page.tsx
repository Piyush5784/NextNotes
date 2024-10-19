"use client";
import useGetAllNotesWithNoteId from "@/hooks/useGetNoteWithId";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation"; // for getting the params in Next.js 13+
import Loader from "../../components/Loader";
let Editor = dynamic(
  () => import("@/app/pages/dashboard/read-note/[id]/components/Editor"),
  {
    ssr: false,
  }
);

const NotePage = () => {
  const params = useParams(); // Get the dynamic route params
  const { data: session } = useSession();

  let noteId = params?.id; // Capture the noteId from the URL
  if (!noteId) {
    return <p>Invalid Note Id</p>; // Display an error if noteId is not available
  }
  if (Array.isArray(noteId)) {
    noteId = noteId[0]; // If noteId is an array, take the first element
  }
  const { notes, isError, isLoading } = useGetAllNotesWithNoteId(
    session?.user?.email!,
    noteId
  );
  if (isLoading) {
    return <Loader />;
  }
  if (notes) {
    return <Editor notes={notes} noteId={noteId} />;
  }

  // Pass the noteId to the Editor component
};

export default NotePage;
