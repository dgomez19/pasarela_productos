-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "bank_account" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "value" DECIMAL(9,2) NOT NULL,
    "userIp" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "cus" TEXT NOT NULL,
    "urlRedirect" TEXT NOT NULL,
    "valueDelivery" DECIMAL(9,2) NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
