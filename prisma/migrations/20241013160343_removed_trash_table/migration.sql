/*
  Warnings:

  - You are about to drop the `Trash` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trash" DROP CONSTRAINT "Trash_userId_fkey";

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "Favorite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "Trash" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Trash";
