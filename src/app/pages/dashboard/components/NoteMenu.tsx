import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import DeleteNote from "./DeleteNote";

const NoteMenu = ({ noteId }: { noteId: number }) => {
  return (
    <div className="relative inline-block dark:text-black">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition duration-200">
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent asChild>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-2 min-w-[100px] z-10"
          >
            <Link href={`/pages/dashboard/read-note/${noteId}`} passHref>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition duration-200">
                Edit
              </DropdownMenuItem>
            </Link>
            <DeleteNote id={noteId} />
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NoteMenu;
