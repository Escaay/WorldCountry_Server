/*
  Warnings:

  - You are about to alter the column `senderCurrentAddress` on the `article_comment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `article_comment` MODIFY `senderCurrentAddress` JSON NOT NULL;
