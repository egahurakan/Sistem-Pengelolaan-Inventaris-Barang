/*
  Warnings:

  - Added the required column `qty` to the `Peminjaman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `peminjaman` ADD COLUMN `qty` INTEGER NOT NULL;
