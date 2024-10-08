/*
  Warnings:

  - You are about to alter the column `status` on the `user_basis` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `user_basis` MODIFY `status` JSON NULL;
