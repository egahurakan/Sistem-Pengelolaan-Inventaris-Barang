/*
  Warnings:

  - You are about to drop the column `created_date` on the `peminjaman` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `peminjaman` DROP COLUMN `created_date`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
