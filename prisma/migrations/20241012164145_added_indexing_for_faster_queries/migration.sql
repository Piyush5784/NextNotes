-- CreateIndex
CREATE INDEX "Note_time_idx" ON "Note"("time");

-- CreateIndex
CREATE INDEX "Trash_deletedAt_idx" ON "Trash"("deletedAt");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");
