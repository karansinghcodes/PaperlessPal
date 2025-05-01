/*
  Warnings:

  - Added the required column `additionalNotes` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "additionalNotes" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL;
