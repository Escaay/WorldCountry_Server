/*
  Warnings:

  - You are about to drop the column `height` on the `user_basis` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `user_basis` table. All the data in the column will be lost.
  - Added the required column `articleSenderId` to the `article_comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article_comment` ADD COLUMN `articleSenderId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user_basis` DROP COLUMN `height`,
    DROP COLUMN `weight`;
