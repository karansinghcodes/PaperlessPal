/*
  Warnings:

  - Added the required column `subTotal` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxPercent` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAfterTax` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "subTotal" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "taxPercent" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "totalAfterTax" DECIMAL(65,30) NOT NULL;
