/*
  Warnings:

  - You are about to alter the column `tgl_pinjam` on the `peminjaman` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Date`.
  - You are about to alter the column `tgl_kembali` on the `peminjaman` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Date`.
  - You are about to alter the column `status` on the `peminjaman` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `barang` ADD COLUMN `status` ENUM('ada', 'dipinjam') NOT NULL DEFAULT 'ada';

-- AlterTable
ALTER TABLE `peminjaman` MODIFY `tgl_pinjam` DATE NOT NULL,
    MODIFY `tgl_kembali` DATE NOT NULL,
    MODIFY `status` ENUM('ada', 'dipinjam') NOT NULL DEFAULT 'dipinjam';
