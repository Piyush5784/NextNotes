import React, { FC, useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { editorConfig } from "./editorjs.config";

export type EditorProps = {
  data: OutputData;
  onChange: (data: OutputData) => void;
};

const Editor: FC<EditorProps> = ({ data, onChange }) => {
  const editorInstance = useRef<EditorJS | null>(null);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!editorInstance.current) {
      editorInstance.current = new EditorJS({
        ...editorConfig,
        data: data,
        onChange: async (api, event: any) => {
          if (onChange) {
            const savedData = await api.saver.save();

            onChange(savedData);
          }
        },
      });
    }

    return () => {
      if (editorInstance.current && editorInstance.current.destroy) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  return <div id="editorjs" ref={editorContainerRef}></div>;
};

export default Editor;
