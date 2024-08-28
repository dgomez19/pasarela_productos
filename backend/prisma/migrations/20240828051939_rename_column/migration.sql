/*
  Warnings:

  - You are about to alter the column `total` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(9,2)`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "total" SET DATA TYPE DECIMAL(9,2);
