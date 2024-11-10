/*
  Warnings:

  - You are about to drop the column `senderOriginalAddress` on the `activity` table. All the data in the column will be lost.
  - You are about to drop the column `senderOriginalAddress` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `originalAddress` on the `user_basis` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `user_basis` table. All the data in the column will be lost.
  - Added the required column `senderCurrentAddress` to the `activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activity` DROP COLUMN `senderOriginalAddress`,
    ADD COLUMN `senderCurrentAddress` JSON NOT NULL;

-- AlterTable
ALTER TABLE `article` DROP COLUMN `senderOriginalAddress`,
    ADD COLUMN `senderCurrentAddress` JSON NOT NULL;

-- AlterTable
ALTER TABLE `user_basis` DROP COLUMN `originalAddress`,
    DROP COLUMN `status`,
    ADD COLUMN `gameList` JSON NULL;
