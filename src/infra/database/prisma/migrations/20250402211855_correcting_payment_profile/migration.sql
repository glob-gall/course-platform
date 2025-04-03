/*
  Warnings:

  - You are about to drop the column `assasPaymentProfileId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `AssasPaymentProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `AssasPaymentProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_assasPaymentProfileId_fkey";

-- AlterTable
ALTER TABLE "AssasPaymentProfile" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "assasPaymentProfileId";

-- CreateIndex
CREATE UNIQUE INDEX "AssasPaymentProfile_userId_key" ON "AssasPaymentProfile"("userId");

-- AddForeignKey
ALTER TABLE "AssasPaymentProfile" ADD CONSTRAINT "AssasPaymentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
