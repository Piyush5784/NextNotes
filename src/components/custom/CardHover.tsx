import { Pencil, CheckSquare, FileText, RefreshCw, Clock } from "lucide-react";
import { HoverEffect } from "../acernity-components/Card-hover-effect";

export function CardHoverEffect() {
  const projects = [
    {
      title: (
        <>
          <Pencil className="h-8 w-8 mb-2 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xl font-bold">Easy Note-Taking</h3>
        </>
      ),
      description:
        "Quickly Note down your thoughts with our intuitive interface. Capture ideas, tasks, and inspirations effortlessly.",
    },
    {
      title: (
        <>
          <CheckSquare className="h-8 w-8 mb-2 text-green-600 dark:text-green-400" />
          <h3 className="text-xl font-bold">Task Management</h3>
        </>
      ),
      description:
        "Create and manage to-do lists to stay organized. Track your progress and achieve your goals efficiently.",
    },
    {
      title: (
        <>
          <FileText className="h-8 w-8 mb-2 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-bold">Rich Text Editor</h3>
        </>
      ),
      description:
        "Create your notes with rich text formatting options. Customize your notes with fonts, colors, and styles.",
    },
    {
      title: (
        <>
          <RefreshCw className="h-8 w-8 mb-2 text-orange-600 dark:text-orange-400" />
          <h3 className="text-xl font-bold">Sync Across Devices</h3>
        </>
      ),
      description:
        "Access your notes from any device, anytime. Keep your notes updated and synchronized across all your devices.",
    },
    {
      title: (
        <>
          <Clock className="h-8 w-8 mb-2 text-red-600 dark:text-red-400" />
          <h3 className="text-xl font-bold">Unlimited Notes</h3>
        </>
      ),
      description:
        "Create as many notes as you need, without limits. Never worry about running out of space for your ideas.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
