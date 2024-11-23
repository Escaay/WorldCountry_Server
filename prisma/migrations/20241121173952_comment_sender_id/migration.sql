/*
  Warnings:

  - Added the required column `commentSenderId` to the `article_comment_like` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article_comment_like` ADD COLUMN `commentSenderId` VARCHAR(191) NOT NULL;
