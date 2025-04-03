/*
  Warnings:

  - Made the column `cpf` on table `AssasPaymentProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `asaasId` on table `AssasPaymentProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AssasPaymentProfile" ALTER COLUMN "cpf" SET NOT NULL,
ALTER COLUMN "asaasId" SET NOT NULL;
