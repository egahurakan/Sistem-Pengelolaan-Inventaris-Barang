/*
  Warnings:

  - You are about to drop the column `location` on the `peminjaman` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `peminjaman` DROP COLUMN `location`,
    ADD COLUMN `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
