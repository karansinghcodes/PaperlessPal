/*
  Warnings:

  - You are about to drop the column `issuedDate` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `issueDate` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "issuedDate",
ADD COLUMN     "issueDate" TIMESTAMP(3) NOT NULL;
