/*
  Warnings:

  - Made the column `createTime` on table `chat_list` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updateTime` on table `chat_list` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `chat_list` MODIFY `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updateTime` DATETIME(3) NOT NULL;
