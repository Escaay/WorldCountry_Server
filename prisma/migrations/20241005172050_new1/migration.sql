/*
  Warnings:

  - You are about to drop the `messgae_list` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `user_basis` MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL DEFAULT '',
    MODIFY `avatarURL` VARCHAR(191) NULL DEFAULT 'https://www.bing.com/images/search?q=%E5%A4%B4%E5%83%8F&FORM=IQFRBA&id=104C5A5EDCF06680BDFE59E35C147516E0ABD939';

-- AlterTable
ALTER TABLE `user_login` ADD COLUMN `recentLoginTime` DATETIME(3) NULL,
    ADD COLUMN `registerTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `messgae_list`;

-- CreateTable
CREATE TABLE `chat_list` (
    `id` VARCHAR(191) NOT NULL,
    `createTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateTime` DATETIME(3) NULL,
    `name` VARCHAR(191) NOT NULL,
    `isRead` BOOLEAN NULL DEFAULT false,
    `isDelete` BOOLEAN NULL DEFAULT false,
    `content` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `chat_list_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
