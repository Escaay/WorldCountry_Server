/*
  Warnings:

  - You are about to drop the column `articlecCommentId` on the `article_comment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[articleCommentId]` on the table `article_comment` will be added. If there are existing duplicate values, this will fail.
  - The required column `articleCommentId` was added to the `article_comment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX `article_comment_articlecCommentId_key` ON `article_comment`;

-- AlterTable
ALTER TABLE `article_comment` DROP COLUMN `articlecCommentId`,
    ADD COLUMN `articleCommentId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `article_comment_articleCommentId_key` ON `article_comment`(`articleCommentId`);
