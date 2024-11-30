/*
  Warnings:

  - A unique constraint covering the columns `[chatId]` on the table `chat_list` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `chat_list_userId_key` ON `chat_list`;

-- AlterTable
ALTER TABLE `chat_list` ADD COLUMN `chatId` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `receiverId` VARCHAR(191) NULL,
    ADD COLUMN `senderId` VARCHAR(191) NULL,
    MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `message_list` MODIFY `senderId` VARCHAR(191) NULL,
    MODIFY `receiverId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `chat_list_chatId_key` ON `chat_list`(`chatId`);

-- AddForeignKey
ALTER TABLE `chat_list` ADD CONSTRAINT `chat_list_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `user_basis`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_list` ADD CONSTRAINT `chat_list_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `user_basis`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message_list` ADD CONSTRAINT `message_list_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `chat_list`(`chatId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message_list` ADD CONSTRAINT `message_list_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `user_basis`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message_list` ADD CONSTRAINT `message_list_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `user_basis`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article_comment` ADD CONSTRAINT `article_comment_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article_like` ADD CONSTRAINT `article_like_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article_comment_like` ADD CONSTRAINT `article_comment_like_articleCommentId_fkey` FOREIGN KEY (`articleCommentId`) REFERENCES `article_comment`(`articleCommentId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article_comment_like` ADD CONSTRAINT `article_comment_like_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;
