/*
  Warnings:

  - The primary key for the `pengembalian` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_return` on the `pengembalian` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `pengembalian` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `pengembalian` table. All the data in the column will be lost.
  - Added the required column `id` to the `Pengembalian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tgl_kembali` to the `Pengembalian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pengembalian` DROP PRIMARY KEY,
    DROP COLUMN `id_return`,
    DROP COLUMN `id_user`,
    DROP COLUMN `status`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `tgl_kembali` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`id`);
