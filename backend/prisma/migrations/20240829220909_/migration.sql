/*
  Warnings:

  - You are about to drop the column `uuid` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "uuid";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "uuid";
