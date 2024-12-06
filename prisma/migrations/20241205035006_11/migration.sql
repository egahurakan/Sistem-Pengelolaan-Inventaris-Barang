/*
  Warnings:

  - Added the required column `location` to the `Peminjaman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `peminjaman` ADD COLUMN `location` VARCHAR(191) NOT NULL;
