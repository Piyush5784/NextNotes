import * as z from "zod";

// Define the Zod schema for each block type
const ParagraphSchema = z.object({
  type: z.literal("paragraph"),
  data: z.object({
    text: z.string().optional(),
  }),
});

const HeaderSchema = z.object({
  type: z.literal("header"),
  data: z.object({
    text: z.string(),
    level: z.number(),
  }),
});

const ListSchema = z.object({
  type: z.literal("list"),
  data: z.object({
    style: z.string(),
    items: z.array(z.string()),
  }),
});

const QuoteSchema = z.object({
  type: z.literal("quote"),
  data: z.object({
    text: z.string().optional(),
    caption: z.string().optional(),
    alignment: z.string().optional(),
  }),
});

const CodeSchema = z.object({
  type: z.literal("code").optional(),
  data: z.object({
    code: z.string().optional(),
  }),
});

const DelimiterSchema = z.object({
  type: z.literal("delimiter"),
  data: z.object({}), // Empty object for delimiter
});

const TableSchema = z.object({
  type: z.literal("table"),
  data: z.object({
    withHeadings: z.boolean().optional(),
    content: z.array(z.array(z.string())).optional(),
  }),
});

// Union of all block schemas, each wrapped in z.optional()
const BlockDataSchema = z.union([
  ParagraphSchema.optional(),
  HeaderSchema.optional(),
  ListSchema.optional(),
  QuoteSchema.optional(),
  CodeSchema.optional(),
  DelimiterSchema.optional(),
  TableSchema.optional(),
]);

// Define the Zod schema for Note
export const NoteSchema = z.object({
  time: z.number(),
  noteId: z.string(),
  blocks: z.array(BlockDataSchema).optional(),
  version: z.string(),
});

// email: user.data?.user?.email,
// id: noteId,
// time: editorjsData.time,
// blocks: editorjsData.blocks,
// version: editorjsData.version || "1.0",
// Define the validation schema using Zod

export const SubscribeEmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});
