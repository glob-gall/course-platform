/*
  Warnings:

  - You are about to drop the column `asaasId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "asaasId",
DROP COLUMN "cpf",
ADD COLUMN     "assasPaymentProfileId" TEXT;

-- CreateTable
CREATE TABLE "AssasPaymentProfile" (
    "id" TEXT NOT NULL,
    "cpf" TEXT,
    "asaasId" TEXT,

    CONSTRAINT "AssasPaymentProfile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_assasPaymentProfileId_fkey" FOREIGN KEY ("assasPaymentProfileId") REFERENCES "AssasPaymentProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
