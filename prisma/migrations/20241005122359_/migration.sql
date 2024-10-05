/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User1` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `Profile`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `User1`;

-- CreateTable
CREATE TABLE `user_basis` (
    `id` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `avatarURL` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `age` VARCHAR(191) NULL,
    `vx` VARCHAR(191) NULL,
    `originalAddress` JSON NULL,
    `currentAddress` JSON NULL,
    `status` VARCHAR(191) NULL,
    `filterInfo` JSON NULL,
    `customTags` VARCHAR(191) NULL,
    `height` VARCHAR(191) NULL,
    `weight` VARCHAR(191) NULL,

    UNIQUE INDEX `user_basis_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_login` (
    `id` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `accesstoken` VARCHAR(191) NULL,
    `refreshToken` VARCHAR(191) NULL,

    UNIQUE INDEX `user_login_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `messgae_list` (
    `id` VARCHAR(191) NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateTime` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `content` VARCHAR(191) NOT NULL DEFAULT '',
    `time` VARCHAR(191) NOT NULL DEFAULT '',

    UNIQUE INDEX `messgae_list_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
