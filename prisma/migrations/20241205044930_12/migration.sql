/*
  Warnings:

  - You are about to alter the column `status` on the `barang` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(2))`.
  - You are about to alter the column `status` on the `peminjaman` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(2))`.
  - Added the required column `borrow_date` to the `Peminjaman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `retur_date` to the `Peminjaman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `barang` MODIFY `status` ENUM('kembali', 'dipinjam') NOT NULL DEFAULT 'kembali';

-- AlterTable
ALTER TABLE `peminjaman` ADD COLUMN `borrow_date` DATE NOT NULL,
    ADD COLUMN `retur_date` DATE NOT NULL,
    MODIFY `status` ENUM('kembali', 'dipinjam') NOT NULL DEFAULT 'dipinjam';

-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_id_barang_fkey` FOREIGN KEY (`id_barang`) REFERENCES `Barang`(`id_barang`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
