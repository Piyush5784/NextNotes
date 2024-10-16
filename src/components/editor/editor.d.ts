declare module "@editorjs/image" {}
declare module "@editorjs/paragraph" {
  import { BlockToolConstructable } from "@editorjs/editorjs";
  const Paragraph: BlockToolConstructable;

  export default Paragraph;
}
