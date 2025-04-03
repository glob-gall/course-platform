/*
  Warnings:

  - You are about to drop the column `PromoPriceInCents` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "PromoPriceInCents",
ADD COLUMN     "promoPriceInCents" INTEGER,
ALTER COLUMN "maxDatePromoPrice" DROP NOT NULL;
