-- CreateEnum
CREATE TYPE "loginMethod" AS ENUM ('google', 'credentials');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "loginMethod" "loginMethod" NOT NULL DEFAULT 'credentials',
ALTER COLUMN "password" DROP NOT NULL;
