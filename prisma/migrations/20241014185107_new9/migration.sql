/*
  Warnings:

  - You are about to drop the column `senderId1` on the `message_list` table. All the data in the column will be lost.
  - You are about to drop the column `senderId2` on the `message_list` table. All the data in the column will be lost.
  - Added the required column `receiverId` to the `message_list` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `message_list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `message_list` DROP COLUMN `senderId1`,
    DROP COLUMN `senderId2`,
    ADD COLUMN `receiverId` VARCHAR(191) NOT NULL,
    ADD COLUMN `senderId` VARCHAR(191) NOT NULL;
