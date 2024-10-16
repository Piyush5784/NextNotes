/*
  Warnings:

  - Added the required column `updatedAt` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Trash" (
    "id" SERIAL NOT NULL,
    "noteId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "time" BIGINT NOT NULL,
    "version" TEXT NOT NULL,
    "blocks" JSONB NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trash_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trash_noteId_key" ON "Trash"("noteId");

-- AddForeignKey
ALTER TABLE "Trash" ADD CONSTRAINT "Trash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
