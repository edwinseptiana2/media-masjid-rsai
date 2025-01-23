/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `author` VARCHAR(191) NULL,
    ADD COLUMN `badge` VARCHAR(191) NULL,
    ADD COLUMN `content` LONGTEXT NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL,
    ADD COLUMN `subtitle` VARCHAR(255) NULL,
    MODIFY `title` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Post_slug_key` ON `Post`(`slug`);
