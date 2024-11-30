/*
  Warnings:

  - You are about to drop the `team_applicant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `team_applicant`;

-- CreateTable
CREATE TABLE `team_application` (
    `applicationId` VARCHAR(191) NOT NULL,
    `articleId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `textContent` VARCHAR(191) NOT NULL,
    `articleTextContent` VARCHAR(191) NOT NULL,
    `articleFirstImageURL` MEDIUMTEXT NULL,
    `status` INTEGER NOT NULL,
    `userAvatarURL` MEDIUMTEXT NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `userGender` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `team_application_applicationId_key`(`applicationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
