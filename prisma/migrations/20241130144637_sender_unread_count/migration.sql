/*
  Warnings:

  - You are about to drop the column `chatList` on the `chat_list` table. All the data in the column will be lost.
  - You are about to drop the column `unReadCount` on the `chat_list` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `chat_list` DROP COLUMN `chatList`,
    DROP COLUMN `unReadCount`,
    ADD COLUMN `receiverUnreadCount` INTEGER NULL,
    ADD COLUMN `senderUnreadCount` INTEGER NULL,
    MODIFY `lastMessage` VARCHAR(191) NULL;
