"use client";
import { editorConfig } from "@/components/editor/editorjs.config";
import { Button } from "@/components/ui/button";
import useGetAllNotes from "@/hooks/useGetAllNotes";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
const Editor = ({ notes, noteId }: { notes: OutputData[]; noteId: string }) => {
  const ejInstance = useRef();
  const user = useSession();
  const { mutate } = useGetAllNotes(user.data?.user?.email || "");
  const default_Data = notes[0];
  const [editorjsData, setEditorjsData] = useState<OutputData>(default_Data);
  const [initialData, setInitialData] = useState<OutputData>(default_Data); // Store the initial data
  const [hasChanged, setHasChanged] = useState(false); // Track if content has changed
  const [savingStatus, setSavingStatus] = useState(false);
  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      //@ts-ignore
      ejInstance?.current?.destroy();
      //@ts-ignore
      ejInstance.current = null;
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      onReady: () => {
        console.log("editor is ready");
      },
      data: default_Data,
      autofocus: true,
      onChange: async () => {
        let content = await editor.saver.save();
        setEditorjsData(content);
        setHasChanged(JSON.stringify(content) !== JSON.stringify(initialData));
      },
      ...editorConfig,
    });
  };
  const handleSave = async () => {
    if (!user.data?.user?.email) {
      return toast.error("No user logged in");
    }
    const note = {
      email: user.data?.user?.email,
      id: Number(noteId),
      time: editorjsData.time,
      blocks: editorjsData.blocks,
      version: editorjsData.version || "1.0",
    };

    try {
      setSavingStatus(true);
      await toast.promise(axios.post(`/api/notes`, note), {
        loading: "Saving note...",
        success: (res) => {
          mutate();
          setSavingStatus(false);
          return res.data.message;
        },
        error: (error) => {
          console.log(error);
          setSavingStatus(false);
          return "Failed to save data"; // The message to show on error
        },
      });
    } catch (error) {
      console.log(error);
      setSavingStatus(false);
      toast.error("falied to save data");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        {hasChanged && (
          <Button onClick={handleSave} disabled={savingStatus}>
            Save
          </Button>
        )}
      </div>
      <div id="editorjs"></div>
    </>
  );
};

export default Editor;
