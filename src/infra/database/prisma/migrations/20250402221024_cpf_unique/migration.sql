/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `AssasPaymentProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AssasPaymentProfile_cpf_key" ON "AssasPaymentProfile"("cpf");
