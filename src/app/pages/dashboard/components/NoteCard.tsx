import { Note } from "@/types/TsTypes";
import { CalendarIcon, ClockIcon } from "lucide-react";
import Link from "next/link";
import NoteMenu from "./NoteMenu";

export interface Block {
  type: string;
  data: {
    text: string;
  };
}

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const { id, time, version, blocks } = note;

  // Convert timestamp to a readable date format
  const date = new Date(Number(time));
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Function to get version color
  const getVersionColor = (version: string) => {
    const versionNumber = parseFloat(version);
    if (versionNumber >= 2) return "bg-green-100 text-green-800";
    if (versionNumber >= 1) return "bg-blue-100 text-blue-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className={`p-3  `}>
      <div className="py-6">
        <div className="flex items-center justify-between mb-4 w-full">
          <h2 className="text-xl font-semibold  w-52 ">
            <p
              className=" leading-relaxed"
              dangerouslySetInnerHTML={{
                __html:
                  blocks[0] !== undefined
                    ? blocks[0].data.text?.slice(0, 50) + "..." || ""
                    : "",
              }}
            />
          </h2>
          <div>
            <NoteMenu noteId={id} />
          </div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm ">
          <CalendarIcon className="w-4 h-4 mr-2" />
          {formattedDate}
        </div>
        <div className="flex items-center text-sm ">
          <ClockIcon className="w-4 h-4 mr-2" />
          {formattedTime}
        </div>
      </div>
      <Link href={`/pages/dashboard/read-note/${note.id}`} passHref>
        <div className="space-y-3 h-12 overflow-hidden ">
          {blocks.map(
            (block, index) =>
              index != 0 && (
                <div key={index} className="w-60">
                  {block.type === "paragraph" && (
                    <p
                      className=" leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: block.data.text
                          ? block.data.text.slice(0, 50) + "..."
                          : "",
                      }}
                    />
                  )}
                </div>
              )
          )}
        </div>
      </Link>
    </div>
  );
}
