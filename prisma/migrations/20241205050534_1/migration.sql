/*
  Warnings:

  - You are about to drop the column `borrow_date` on the `peminjaman` table. All the data in the column will be lost.
  - You are about to drop the column `retur_date` on the `peminjaman` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `peminjaman` DROP COLUMN `borrow_date`,
    DROP COLUMN `retur_date`;
