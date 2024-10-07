-- CreateTable
CREATE TABLE `user_basis` (
    `id` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `avatarURL` VARCHAR(191) NOT NULL DEFAULT 'https://www.bing.com/images/search?q=%E5%A4%B4%E5%83%8F&FORM=IQFRBA&id=104C5A5EDCF06680BDFE59E35C147516E0ABD939',
    `gender` VARCHAR(191) NULL,
    `age` INTEGER NULL,
    `vx` VARCHAR(191) NULL,
    `originalAddress` JSON NULL,
    `currentAddress` JSON NULL,
    `status` VARCHAR(191) NULL,
    `filterInfo` JSON NULL,
    `customTags` JSON NULL,
    `height` INTEGER NULL,
    `weight` INTEGER NULL,

    UNIQUE INDEX `user_basis_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_login` (
    `id` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `registerTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `recentLoginTime` DATETIME(3) NULL,
    `accesstoken` VARCHAR(191) NULL,
    `refreshToken` VARCHAR(191) NULL,
    `code` VARCHAR(191) NULL,

    UNIQUE INDEX `user_login_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat_list` (
    `id` VARCHAR(191) NOT NULL,
    `body` JSON NULL,

    UNIQUE INDEX `chat_list_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
