"use client";
import useGetAllNotesWithNoteId from "@/hooks/useGetNoteWithId";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

let Editor = dynamic(
  () => import("@/app/pages/dashboard/read-note/[id]/components/Editor"),
  {
    ssr: false,
  }
);

const NotePage = () => {
  const params = useParams();

  const { data: session } = useSession();
  const [noteId, setNoteId] = useState<string>(
    Array.isArray(params?.id) ? params?.id[0] : params?.id
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setNoteId(Array.isArray(params?.id) ? params?.id[0] : params?.id);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [params?.id]);

  const { notes, isError, isLoading, refreshNotes } = useGetAllNotesWithNoteId(
    session?.user?.email!,
    noteId
  );

  if (!noteId) {
    return <p>Invalid Note Id</p>;
  }

  if (isLoading || loading) {
    return <Loader />;
  }

  if (notes.length > 0) {
    return <Editor notes={notes} noteId={noteId} />;
  }

  return null; // Handle the case where no notes are available
};

export default NotePage;
