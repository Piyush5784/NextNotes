"use client";

import { Button } from "@/components/ui/button";
import useGetAllNotes from "@/hooks/useGetAllNotes";
import { NoteSchema } from "@/types/Ztypes";
import { OutputData } from "@editorjs/editorjs";
import axios from "axios";
import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Editor = dynamic(() => import("@/components/editor/Editor"), {
  ssr: false,
});

const Page = () => {
  const { data: session } = useSession();
  const { notes } = useGetAllNotes(session?.user?.email || "");
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const default_Data: OutputData = {
    time: new Date().getTime(),
    blocks: [
      {
        id: "1",
        type: "paragraph",
        data: { text: "My first note" },
      },
    ],
  };

  const [editorData, setEditorData] = useState<OutputData>(default_Data);

  const handleSave = async () => {
    const note = {
      noteId: String(notes.length + 1),
      time: editorData.time,
      blocks: editorData.blocks,
      version: editorData.version || "1.0",
    };

    const format = NoteSchema.safeParse(note);
    if (!format.success) {
      return toast.error("Invalid data");
    }

    setIsSubmitting(true);
    try {
      await axios.post("/api/notes", note);
      toast.success("Note successfully saved!");
      router.push("/pages/dashboard");
    } catch (error) {
      toast.error("Failed to save note.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-end items-center p-2 w-full md:px-24">
          <Button
            disabled={isSubmitting}
            variant={"outline"}
            className=" ml-2 inline-flex border dark:text-primary text-purple-950 border-primary bg-transparent hover:bg-hoverBg hover:border-secondary  hover:text-purple-950 shadow-inner hover:shadow-hoverShadow transition-all duration-300 "
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
        <Editor data={editorData} onChange={setEditorData} />
      </div>
    </>
  );
};

export default Page;
