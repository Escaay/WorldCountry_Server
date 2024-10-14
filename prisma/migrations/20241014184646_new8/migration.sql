/*
  Warnings:

  - You are about to drop the `chat_detail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `chat_detail`;

-- CreateTable
CREATE TABLE `message_list` (
    `messageId` VARCHAR(191) NOT NULL,
    `chatId` VARCHAR(191) NOT NULL,
    `senderId1` VARCHAR(191) NOT NULL,
    `senderId2` VARCHAR(191) NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `content` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `message_list_messageId_key`(`messageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
