/*
  Warnings:

  - You are about to drop the column `senderAge` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `senderAvatarURL` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `senderCurrentAddress` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `senderGender` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `senderName` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `articleSenderId` on the `article_like` table. All the data in the column will be lost.
  - You are about to drop the column `articleTextContent` on the `article_like` table. All the data in the column will be lost.
  - You are about to drop the column `senderAge` on the `article_like` table. All the data in the column will be lost.
  - You are about to drop the column `senderAvatarURL` on the `article_like` table. All the data in the column will be lost.
  - You are about to drop the column `senderCurrentAddress` on the `article_like` table. All the data in the column will be lost.
  - You are about to drop the column `senderGender` on the `article_like` table. All the data in the column will be lost.
  - You are about to drop the column `senderName` on the `article_like` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `chat_list` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `article` DROP COLUMN `senderAge`,
    DROP COLUMN `senderAvatarURL`,
    DROP COLUMN `senderCurrentAddress`,
    DROP COLUMN `senderGender`,
    DROP COLUMN `senderName`;

-- AlterTable
ALTER TABLE `article_like` DROP COLUMN `articleSenderId`,
    DROP COLUMN `articleTextContent`,
    DROP COLUMN `senderAge`,
    DROP COLUMN `senderAvatarURL`,
    DROP COLUMN `senderCurrentAddress`,
    DROP COLUMN `senderGender`,
    DROP COLUMN `senderName`;

-- AlterTable
ALTER TABLE `chat_list` DROP COLUMN `userId`,
    ADD COLUMN `lastMessage` MEDIUMTEXT NULL,
    ADD COLUMN `lastMessageTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `unReadCount` INTEGER NULL;
