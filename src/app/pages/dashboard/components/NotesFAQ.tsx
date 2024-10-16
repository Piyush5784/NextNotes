import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function NotesFAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="question-1">
        <AccordionTrigger>How to create a note block?</AccordionTrigger>
        <AccordionContent>
          Go to the Create page using the "Create" option in the side nav, write
          a block using Editor.js, and then hit save. After saving, you will see
          the note on the home page.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="question-2">
        <AccordionTrigger>How to delete a note?</AccordionTrigger>
        <AccordionContent>
          Click on the menu icon for the note, and you will see a "Delete"
          option. Upon clicking it, the note will be deleted.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="question-3">
        <AccordionTrigger>How to recover a deleted note?</AccordionTrigger>
        <AccordionContent>
          Head over to the "Trash" page by clicking the option on the right side
          of the nav. Here, users can see all deleted notes, and they can
          restore or permanently delete them.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="question-4">
        <AccordionTrigger>How to restore a note?</AccordionTrigger>
        <AccordionContent>
          Go to the "Trash" page and click the "Restore" button next to the note
          to restore it back to the home page.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="question-5">
        <AccordionTrigger>
          Is there any way to restore a note after being deleted from trash?
        </AccordionTrigger>
        <AccordionContent>
          No, once a note is deleted from the trash, it cannot be restored.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="question-6">
        <AccordionTrigger>Is NextNotes free?</AccordionTrigger>
        <AccordionContent>
          Yes, NextNotes is free for all users.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="question-7">
        <AccordionTrigger>
          Does NextNotes use data for advertising or share it with other
          companies?
        </AccordionTrigger>
        <AccordionContent>
          No, NextNotes does not use data for advertising or share it with other
          companies.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
