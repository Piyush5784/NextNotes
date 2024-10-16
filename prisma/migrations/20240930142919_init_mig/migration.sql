/*
  Warnings:

  - A unique constraint covering the columns `[noteId]` on the table `Note` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `noteId` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "noteId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Note_noteId_key" ON "Note"("noteId");
