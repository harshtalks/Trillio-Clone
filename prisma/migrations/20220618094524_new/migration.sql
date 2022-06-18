/*
  Warnings:

  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BoardToMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CardToMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_userId_fkey";

-- DropForeignKey
ALTER TABLE "_BoardToMember" DROP CONSTRAINT "_BoardToMember_A_fkey";

-- DropForeignKey
ALTER TABLE "_BoardToMember" DROP CONSTRAINT "_BoardToMember_B_fkey";

-- DropForeignKey
ALTER TABLE "_CardToMember" DROP CONSTRAINT "_CardToMember_A_fkey";

-- DropForeignKey
ALTER TABLE "_CardToMember" DROP CONSTRAINT "_CardToMember_B_fkey";

-- DropTable
DROP TABLE "Member";

-- DropTable
DROP TABLE "_BoardToMember";

-- DropTable
DROP TABLE "_CardToMember";

-- CreateTable
CREATE TABLE "MemberBoard" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,

    CONSTRAINT "MemberBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberCard" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,

    CONSTRAINT "MemberCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MemberBoard_userId_key" ON "MemberBoard"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MemberCard_userId_key" ON "MemberCard"("userId");

-- AddForeignKey
ALTER TABLE "MemberBoard" ADD CONSTRAINT "MemberBoard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberBoard" ADD CONSTRAINT "MemberBoard_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberCard" ADD CONSTRAINT "MemberCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberCard" ADD CONSTRAINT "MemberCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
