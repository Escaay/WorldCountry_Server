-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `user_basis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
