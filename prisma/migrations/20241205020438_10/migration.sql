/*
  Warnings:

  - Added the required column `nama_user` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `nama_user` VARCHAR(191) NOT NULL;
