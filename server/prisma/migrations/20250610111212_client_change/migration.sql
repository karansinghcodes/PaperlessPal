-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "invoiceCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalBilledAmount" INTEGER NOT NULL DEFAULT 0;
