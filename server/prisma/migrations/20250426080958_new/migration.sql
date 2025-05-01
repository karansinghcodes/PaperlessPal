/*
  Warnings:

  - You are about to drop the column `totalAfterTax` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `subTotalAfterTax` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "totalAfterTax",
ADD COLUMN     "subTotalAfterTax" DECIMAL(65,30) NOT NULL;
