-- CreateTable
CREATE TABLE `article` (
    `articleId` VARCHAR(191) NOT NULL,
    `senderOriginalAddress` JSON NOT NULL,
    `senderId` VARCHAR(191) NOT NULL,
    `senderAvatarURL` VARCHAR(191) NOT NULL,
    `senderName` VARCHAR(191) NOT NULL,
    `senderGender` VARCHAR(191) NOT NULL,
    `senderAge` INTEGER NOT NULL,
    `textContent` VARCHAR(191) NOT NULL,
    `commentNum` INTEGER NOT NULL DEFAULT 0,
    `likeInfo` JSON NOT NULL,
    `viewNum` INTEGER NOT NULL DEFAULT 0,
    `imageUrlList` JSON NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateTime` DATETIME(3) NOT NULL,

    UNIQUE INDEX `article_articleId_key`(`articleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `article_comment` (
    `commentId` VARCHAR(191) NOT NULL,
    `articleId` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `likeInfo` JSON NOT NULL,
    `senderId` VARCHAR(191) NOT NULL,
    `senderGender` VARCHAR(191) NOT NULL,
    `senderAvatarURL` MEDIUMTEXT NOT NULL,
    `senderName` VARCHAR(191) NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateTime` DATETIME(3) NOT NULL,

    UNIQUE INDEX `article_comment_commentId_key`(`commentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity` (
    `activityId` VARCHAR(191) NOT NULL,
    `gameName` VARCHAR(191) NOT NULL,
    `senderOriginalAddress` JSON NOT NULL,
    `expireTime` DATETIME(3) NOT NULL,
    `senderId` VARCHAR(191) NOT NULL,
    `senderAvatarURL` VARCHAR(191) NOT NULL,
    `senderName` VARCHAR(191) NOT NULL,
    `senderGender` VARCHAR(191) NOT NULL,
    `senderAge` INTEGER NOT NULL,
    `textContent` VARCHAR(191) NOT NULL,
    `viewNum` INTEGER NOT NULL DEFAULT 0,
    `maxPaticipant` INTEGER NOT NULL,
    `currentPaticipant` JSON NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateTime` DATETIME(3) NOT NULL,

    UNIQUE INDEX `activity_activityId_key`(`activityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
