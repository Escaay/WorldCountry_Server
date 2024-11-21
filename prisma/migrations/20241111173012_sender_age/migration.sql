/*
  Warnings:

  - Added the required column `senderAge` to the `article_comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article_comment` ADD COLUMN `senderAge` INTEGER NOT NULL;
