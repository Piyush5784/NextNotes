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
  const { id, time, blocks } = note;

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

  return (
    <div className="p-6 text-white transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <Link href={`/pages/dashboard/read-note/${note.id}`} passHref>
          <h2 className="text-lg font-semibold leading-relaxed w-40 truncate">
            {blocks[0]?.data.text ? (
              <p
                className="w-full"
                dangerouslySetInnerHTML={{
                  __html:
                    blocks[0] !== undefined
                      ? blocks[0].data.text?.slice(0, 50) + "..." || ""
                      : "",
                }}
              ></p>
            ) : (
              "No content available"
            )}
          </h2>
        </Link>
        <NoteMenu noteId={id} />
      </div>

      <div className="space-y-2 text-sm text-gray-200 mb-4">
        <div className="flex items-center">
          <CalendarIcon className="w-4 h-4 mr-2" />
          {formattedDate}
        </div>
        <div className="flex items-center">
          <ClockIcon className="w-4 h-4 mr-2" />
          {formattedTime}
        </div>
      </div>

      <Link href={`/pages/dashboard/read-note/${note.id}`} passHref>
        <div className="mt-4 space-y-2">
          {blocks.slice(1).map((block, index) => (
            <div key={index} className="w-full">
              {block.type === "paragraph" && (
                <p className="text-sm leading-relaxed text-gray-300">
                  {block.data.text
                    ? block.data.text.slice(0, 50) + "..."
                    : "No additional content"}
                </p>
              )}
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
}
