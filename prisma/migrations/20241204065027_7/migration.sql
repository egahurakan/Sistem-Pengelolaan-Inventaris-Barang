/*
  Warnings:

  - The primary key for the `peminjaman` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `peminjaman` DROP PRIMARY KEY,
    MODIFY `id_borrow` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_borrow`);
