/*
  Warnings:

  - You are about to drop the `activity` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tag` to the `article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likeNum` to the `article_comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `gameName` VARCHAR(191) NULL,
    ADD COLUMN `tag` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `article_comment` ADD COLUMN `likeNum` INTEGER NOT NULL;

-- DropTable
DROP TABLE `activity`;
