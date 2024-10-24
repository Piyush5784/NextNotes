"use client";
import useGetAllNotesWithNoteId from "@/hooks/useGetNoteWithId";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import { NoteSchema } from "@/types/Ztypes";
import { OutputData } from "@editorjs/editorjs";

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
  const [editorjsData, setEditorjsData] = useState<OutputData | null>(null);
  const [initialData, setInitialData] = useState<OutputData | null>(null);
  const [savingStatus, setSavingStatus] = useState(false);

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

  useEffect(() => {
    if (notes.length > 0) {
      setInitialData(notes[0]);
      setEditorjsData(notes[0]);
    }
  }, [notes]);

  const handleSave = async () => {
    if (!session?.user?.email || !editorjsData) {
      return toast.error("No user logged in or no data to save");
    }
    const note = {
      email: session.user.email,
      noteId,
      time: editorjsData.time,
      blocks: editorjsData.blocks,
      version: editorjsData.version || "1.0",
    };

    const format = NoteSchema.safeParse(note);

    try {
      if (!format.success) {
        return toast.error("Invalid data");
      }

      setSavingStatus(true);
      await toast.promise(axios.post(`/api/notes`, note), {
        loading: "Saving note...",
        success: (res) => {
          refreshNotes();
          setSavingStatus(false);
          return res.data.message;
        },
        error: (error) => {
          console.log(error);
          setSavingStatus(false);
          return "Failed to save data";
        },
      });
    } catch (error) {
      console.log(error);
      setSavingStatus(false);
      toast.error("Failed to save data");
    }
  };

  const setEditorData = (data: OutputData) => {
    setEditorjsData(data);
  };

  if (!noteId) {
    return <p>Invalid Note Id</p>;
  }

  if (isLoading || loading) {
    return <Loader />;
  }

  if (notes.length > 0) {
    return (
      <Editor
        notes={notes}
        noteId={noteId}
        handleSave={handleSave}
        setEditorData={setEditorData}
        savingStatus={savingStatus}
        initialData={initialData}
      />
    );
  }

  return null; // Handle the case where no notes are available
};

export default NotePage;
