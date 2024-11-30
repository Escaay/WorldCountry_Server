/*
  Warnings:

  - You are about to drop the column `articleFirstImageURL` on the `team_application` table. All the data in the column will be lost.
  - You are about to drop the column `articleTextContent` on the `team_application` table. All the data in the column will be lost.
  - You are about to drop the column `userAvatarURL` on the `team_application` table. All the data in the column will be lost.
  - You are about to drop the column `userGender` on the `team_application` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `team_application` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `team_application` table. All the data in the column will be lost.
  - Added the required column `applicantId` to the `team_application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `team_application` DROP COLUMN `articleFirstImageURL`,
    DROP COLUMN `articleTextContent`,
    DROP COLUMN `userAvatarURL`,
    DROP COLUMN `userGender`,
    DROP COLUMN `userId`,
    DROP COLUMN `userName`,
    ADD COLUMN `applicantId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `team_application` ADD CONSTRAINT `team_application_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `article`(`articleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team_application` ADD CONSTRAINT `team_application_applicantId_fkey` FOREIGN KEY (`applicantId`) REFERENCES `user_basis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
