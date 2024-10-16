-- CreateTable
CREATE TABLE "SubscribedUsers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "SubscribedUsers_pkey" PRIMARY KEY ("id")
);
