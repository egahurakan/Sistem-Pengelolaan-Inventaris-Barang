-- AlterTable
ALTER TABLE `peminjaman` MODIFY `status` ENUM('ada', 'dipinjam') NOT NULL DEFAULT 'ada';

-- CreateTable
CREATE TABLE `Pengembalian` (
    `id_return` VARCHAR(191) NOT NULL,
    `id_borrow` VARCHAR(191) NOT NULL,
    `id_user` INTEGER NOT NULL,
    `id_barang` INTEGER NOT NULL,
    `status` ENUM('ada', 'dipinjam') NOT NULL DEFAULT 'dipinjam',

    PRIMARY KEY (`id_return`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
