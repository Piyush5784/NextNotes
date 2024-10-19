"use client";
import useGetAllNotes from "@/hooks/useGetAllNotes";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import axios from "axios";
import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { editorConfig } from "./editorjs.config";

const Editor = () => {
  const { data: session } = useSession();
  const { notes, mutate } = useGetAllNotes(session?.user?.email || "");
  const ejInstance = useRef();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const default_Data = {
    time: new Date().getTime(),
    blocks: [
      {
        id: "oUq2g_tl8y",
        type: "paragraph",
        data: {
          text: "<b>My Notes</b>",
          level: 1,
        },
      },
    ],
  };

  const [editorjsData, setEditorjsData] = useState<OutputData>(default_Data);
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
      },
      ...editorConfig,
    });
  };

  const handleSave = async () => {
    const note = {
      email: session?.user?.email,
      id: notes.length + 1,
      time: editorjsData.time,
      blocks: editorjsData.blocks,
      version: editorjsData.version || "1.0",
    };
    setIsSubmitting(true);
    await toast.promise(axios.post(`/api/notes`, note), {
      loading: "Saving note...",
      success: "Note successfully saved",
      error: "Failed to save note.",
    });
    setIsSubmitting(false);
    router.push("/pages/dashboard");
  };

  return (
    <>
      <div className="flex justify-end items-center p-2 w-full pr-40">
        <Button
          disabled={isSubmitting}
          variant={"outline"}
          className="hidden ml-2 md:inline-flex border dark:text-primary text-purple-950 border-primary bg-transparent hover:bg-hoverBg hover:border-secondary  hover:text-purple-950 shadow-inner hover:shadow-hoverShadow transition-all duration-300 "
          onClick={handleSave}
        >
          Save
          <LoaderCircle
            className={clsx("m-2 animate-spin", {
              hidden: !isSubmitting,
            })}
          />
        </Button>
      </div>
      <div id="editorjs"></div>
    </>
  );
};

export default Editor;
