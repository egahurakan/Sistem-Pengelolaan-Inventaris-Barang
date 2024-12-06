/*
  Warnings:

  - The primary key for the `peminjaman` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `borrow` on the `peminjaman` table. All the data in the column will be lost.
  - Added the required column `id_borrow` to the `Peminjaman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `peminjaman` DROP PRIMARY KEY,
    DROP COLUMN `borrow`,
    ADD COLUMN `id_borrow` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_borrow`);
