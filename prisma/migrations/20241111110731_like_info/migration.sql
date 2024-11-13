/*
  Warnings:

  - Added the required column `senderCurrentAddress` to the `article_comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article_comment` ADD COLUMN `senderCurrentAddress` VARCHAR(191) NOT NULL;
