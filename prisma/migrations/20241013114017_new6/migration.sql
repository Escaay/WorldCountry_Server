-- CreateTable
CREATE TABLE `chat_list` (
    `chatId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `partnerId` VARCHAR(191) NOT NULL,
    `partnerAvatarURL` MEDIUMTEXT NOT NULL,
    `partnerName` VARCHAR(191) NOT NULL,
    `lastMessage` MEDIUMTEXT NULL,
    `unReadCount` INTEGER NULL,
    `lastMessageTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `chat_list_chatId_key`(`chatId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat_detail` (
    `chatId` VARCHAR(191) NOT NULL,
    `senderId1` VARCHAR(191) NOT NULL,
    `senderId2` VARCHAR(191) NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `chatHistory` JSON NULL,

    UNIQUE INDEX `chat_detail_chatId_key`(`chatId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
