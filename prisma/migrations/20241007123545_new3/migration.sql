-- CreateTable
CREATE TABLE `chat_list` (
    `id` VARCHAR(191) NOT NULL,
    `body` JSON NULL,

    UNIQUE INDEX `chat_list_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
