/*
  Warnings:

  - You are about to alter the column `age` on the `user_basis` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `height` on the `user_basis` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `weight` on the `user_basis` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `user_basis` MODIFY `age` INTEGER NULL,
    MODIFY `height` INTEGER NULL,
    MODIFY `weight` INTEGER NULL;
