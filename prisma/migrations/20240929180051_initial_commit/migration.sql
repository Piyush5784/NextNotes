-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "time" BIGINT NOT NULL,
    "version" TEXT NOT NULL,
    "blocks" JSONB NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
