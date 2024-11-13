/*
  Warnings:

  - You are about to drop the column `content` on the `article_comment` table. All the data in the column will be lost.
  - Added the required column `textContent` to the `article_comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article_comment` DROP COLUMN `content`,
    ADD COLUMN `imageURL` MEDIUMTEXT NULL,
    ADD COLUMN `textContent` VARCHAR(191) NOT NULL;
