/*
  Warnings:

  - A unique constraint covering the columns `[paymentWompiId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payment_paymentWompiId_key" ON "Payment"("paymentWompiId");
