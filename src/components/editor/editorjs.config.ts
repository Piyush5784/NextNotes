import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import { BlockToolConstructable, EditorConfig } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";

export const editorConfig: EditorConfig = {
  holder: "editorjs",
  tools: {
    header: {
      class: Header as unknown as BlockToolConstructable,
      inlineToolbar: true,
      config: {
        levels: [1, 2, 3, 4, 5, 6],
        defaultLevel: 1,
      },
    },
    list: {
      class: List as unknown as BlockToolConstructable,
      inlineToolbar: true,
    },
    quote: {
      class: Quote as unknown as BlockToolConstructable,
      inlineToolbar: true,
      config: {
        quotePlaceholder: "Enter a quote",
        captionPlaceholder: "Quote's author",
      },
    },
    code: {
      class: Code,
      inlineToolbar: true,
      config: {
        placeholder: "Enter your code...",
      },
    },
    delimiter: Delimiter, // A simple horizontal line separator
    table: {
      class: Table as unknown as BlockToolConstructable,
      inlineToolbar: true,
      config: {
        rows: 2,
        cols: 3,
      },
    },
  },
  defaultBlock: "paragraph",
};
