/*
  Warnings:

  - You are about to drop the column `TeamPeople` on the `article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `article` DROP COLUMN `TeamPeople`,
    ADD COLUMN `teamPeople` JSON NULL;
