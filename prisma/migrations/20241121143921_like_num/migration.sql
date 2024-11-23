/*
  Warnings:

  - Added the required column `likeNum` to the `article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `likeNum` INTEGER NOT NULL;
