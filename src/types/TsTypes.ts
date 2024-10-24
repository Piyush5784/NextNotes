// types.ts

export interface BlockData {
  id: string; // Unique ID for each block
  type: string; // Type of block (paragraph, header, etc.)
  data: {
    text?: string; // Text content (for paragraph blocks)
    level?: number; // Heading level (1-6 for headings)
    style?: string; // Style (if applicable)
    items?: string[]; // List items (if applicable)
    caption?: string; // Caption for images
    alignment?: string; // Alignment for images or content
    code?: string; // Code snippets (if applicable)
    withHeadings?: boolean; // Indicate if it has headings
    content?: string[][]; // Multi-dimensional array for nested content
  };
}

// Note type based on the schema
export interface Note {
  id: number; // Note ID from the database
  userId: number; // User ID associated with the note
  noteId: number; // Unique note identifier
  time: number; // Timestamp for the note
  blocks: BlockData[]; // Array of block data
  version: string; // Version of the note format
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Last update timestamp
  Trash: boolean; // Indicates if the note is in the trash
  Favorite: boolean; // Indicates if the note is marked as favorite
}

// Extend UserWithNotes to include note array and trash
export type UserWithNotes = {
  id: number; // User ID
  name?: string | null; // User's name
  email?: string | null; // User's email
  image?: string | null; // User's image
  notes?: Note[]; // User's notes
};
