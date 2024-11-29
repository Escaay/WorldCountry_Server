-- AlterTable
ALTER TABLE `article_comment` ADD COLUMN `articleFirstImageURL` MEDIUMTEXT NULL;

-- CreateTable
CREATE TABLE `team_applicant` (
    `applicationId` VARCHAR(191) NOT NULL,
    `articleId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `textContent` VARCHAR(191) NOT NULL,
    `articleContent` VARCHAR(191) NOT NULL,
    `articleFirstImageURL` MEDIUMTEXT NULL,
    `status` INTEGER NOT NULL,
    `userAvatarURL` MEDIUMTEXT NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `userGender` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `team_applicant_applicationId_key`(`applicationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
