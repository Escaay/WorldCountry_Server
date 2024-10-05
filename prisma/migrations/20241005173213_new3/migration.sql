/*
  Warnings:

  - Made the column `registerTime` on table `user_login` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user_login` MODIFY `registerTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
