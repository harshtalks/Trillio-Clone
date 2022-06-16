/*
  Warnings:

  - Added the required column `cardId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "cardId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
