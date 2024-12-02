-- AddForeignKey
ALTER TABLE `article_comment` ADD CONSTRAINT `article_comment_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `user_basis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article_like` ADD CONSTRAINT `article_like_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `user_basis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article_comment_like` ADD CONSTRAINT `article_comment_like_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `user_basis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
