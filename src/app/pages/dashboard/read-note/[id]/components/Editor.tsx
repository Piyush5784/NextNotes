"use client";
import { editorConfig } from "@/components/editor/editorjs.config";
import { Button } from "@/components/ui/button";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Editor = ({
  notes,
  noteId,
  handleSave,
  setEditorData,
  savingStatus,
  initialData,
}: {
  notes: OutputData[];
  noteId: string;
  handleSave: () => void;
  setEditorData: (data: OutputData) => void;
  savingStatus: boolean;
  initialData: OutputData | null;
}) => {
  const ejInstance = useRef<EditorJS | null>(null);
  const default_Data = notes[0];
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    // Only initialize the editor if it hasn't been initialized yet
    if (!ejInstance.current) {
      initEditor();
    }

    return () => {
      if (ejInstance.current && ejInstance.current.destroy) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs", // Make sure to set the holder to the correct element ID
      onReady: () => {
        console.log("editor is ready");
      },
      data: default_Data,
      autofocus: true,
      onChange: async () => {
        let content = await editor.saver.save();
        setEditorData(content);
        setHasChanged(JSON.stringify(content) !== JSON.stringify(initialData));
      },
      ...editorConfig,
    });

    ejInstance.current = editor; // Assign the editor instance to the ref
  };

  return (
    <>
      <div className="flex items-end justify-end pr-40">
        <Button
          onClick={handleSave}
          className={clsx(
            "ml-2 md:inline-flex border dark:text-primary text-purple-950 border-primary bg-transparent hover:bg-hoverBg hover:border-secondary hover:text-purple-950 shadow-inner hover:shadow-hoverShadow transition-all duration-300",
            {
              "hover:cursor-not-allowed": !hasChanged,
              "cursor-not-allowed": !hasChanged,
            }
          )}
          disabled={savingStatus || !hasChanged}
        >
          Save{" "}
          <LoaderCircle
            className={clsx("m-2 animate-spin", {
              hidden: !savingStatus,
            })}
          />
        </Button>
      </div>
      <div id="editorjs"></div>
    </>
  );
};

export default Editor;
