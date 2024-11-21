/*
  Warnings:

  - You are about to drop the column `likeInfo` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `commentId` on the `article_comment` table. All the data in the column will be lost.
  - You are about to drop the column `likeInfo` on the `article_comment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[articlecCommentId]` on the table `article_comment` will be added. If there are existing duplicate values, this will fail.
  - The required column `articlecCommentId` was added to the `article_comment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX `article_comment_commentId_key` ON `article_comment`;

-- AlterTable
ALTER TABLE `article` DROP COLUMN `likeInfo`;

-- AlterTable
ALTER TABLE `article_comment` DROP COLUMN `commentId`,
    DROP COLUMN `likeInfo`,
    ADD COLUMN `articlecCommentId` VARCHAR(191) NOT NULL,
    ADD COLUMN `level` INTEGER NULL,
    MODIFY `textContent` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `article_like` (
    `articleLikeId` VARCHAR(191) NOT NULL,
    `articleId` VARCHAR(191) NOT NULL,
    `articleSenderId` VARCHAR(191) NOT NULL,
    `articleTextContent` VARCHAR(191) NULL,
    `senderId` VARCHAR(191) NOT NULL,
    `senderGender` VARCHAR(191) NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `senderAge` INTEGER NOT NULL,
    `senderCurrentAddress` JSON NOT NULL,
    `senderAvatarURL` MEDIUMTEXT NOT NULL,
    `senderName` VARCHAR(191) NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateTime` DATETIME(3) NOT NULL,

    UNIQUE INDEX `article_like_articleLikeId_key`(`articleLikeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `article_comment_like` (
    `articleCommentLikeId` VARCHAR(191) NOT NULL,
    `articleCommentId` VARCHAR(191) NOT NULL,
    `articleId` VARCHAR(191) NOT NULL,
    `articleSenderId` VARCHAR(191) NOT NULL,
    `articleTextContent` VARCHAR(191) NULL,
    `senderId` VARCHAR(191) NOT NULL,
    `senderGender` VARCHAR(191) NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `senderAge` INTEGER NOT NULL,
    `senderCurrentAddress` JSON NOT NULL,
    `senderAvatarURL` MEDIUMTEXT NOT NULL,
    `senderName` VARCHAR(191) NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateTime` DATETIME(3) NOT NULL,

    UNIQUE INDEX `article_comment_like_articleCommentLikeId_key`(`articleCommentLikeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `article_comment_articlecCommentId_key` ON `article_comment`(`articlecCommentId`);
