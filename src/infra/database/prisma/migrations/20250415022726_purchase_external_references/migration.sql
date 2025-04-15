/*
  Warnings:

  - Added the required column `chargeUrl` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "chargeUrl" TEXT NOT NULL,
ADD COLUMN     "externalId" TEXT NOT NULL;
