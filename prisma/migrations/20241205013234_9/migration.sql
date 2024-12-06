-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('admin', 'user') NOT NULL DEFAULT 'admin';
