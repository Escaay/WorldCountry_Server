/*
  Warnings:

  - You are about to drop the column `chatId` on the `chat_list` table. All the data in the column will be lost.
  - You are about to drop the column `lastMessage` on the `chat_list` table. All the data in the column will be lost.
  - You are about to drop the column `lastMessageTime` on the `chat_list` table. All the data in the column will be lost.
  - You are about to drop the column `partnerAvatarURL` on the `chat_list` table. All the data in the column will be lost.
  - You are about to drop the column `partnerId` on the `chat_list` table. All the data in the column will be lost.
  - You are about to drop the column `partnerName` on the `chat_list` table. All the data in the column will be lost.
  - You are about to drop the column `unReadCount` on the `chat_list` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `chat_list` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `chat_list_chatId_key` ON `chat_list`;

-- AlterTable
ALTER TABLE `chat_list` DROP COLUMN `chatId`,
    DROP COLUMN `lastMessage`,
    DROP COLUMN `lastMessageTime`,
    DROP COLUMN `partnerAvatarURL`,
    DROP COLUMN `partnerId`,
    DROP COLUMN `partnerName`,
    DROP COLUMN `unReadCount`,
    ADD COLUMN `chatList` JSON NULL;

-- CreateIndex
CREATE UNIQUE INDEX `chat_list_userId_key` ON `chat_list`(`userId`);
