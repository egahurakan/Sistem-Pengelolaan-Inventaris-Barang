/*
  Warnings:

  - You are about to drop the column `nama` on the `barang` table. All the data in the column will be lost.
  - Added the required column `nama_barang` to the `Barang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `barang` DROP COLUMN `nama`,
    ADD COLUMN `nama_barang` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user';
