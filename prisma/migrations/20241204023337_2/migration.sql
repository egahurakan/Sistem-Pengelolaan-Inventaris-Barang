/*
  Warnings:

  - You are about to drop the column `locale` on the `barang` table. All the data in the column will be lost.
  - Added the required column `location` to the `Barang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `barang` DROP COLUMN `locale`,
    ADD COLUMN `location` VARCHAR(191) NOT NULL;
