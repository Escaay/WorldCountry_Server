/*
  Warnings:

  - You are about to alter the column `customTags` on the `user_basis` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - Made the column `phone` on table `user_basis` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `user_basis` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avatarURL` on table `user_basis` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user_basis` MODIFY `phone` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `avatarURL` VARCHAR(191) NOT NULL DEFAULT 'https://www.bing.com/images/search?q=%E5%A4%B4%E5%83%8F&FORM=IQFRBA&id=104C5A5EDCF06680BDFE59E35C147516E0ABD939',
    MODIFY `customTags` JSON NULL;
