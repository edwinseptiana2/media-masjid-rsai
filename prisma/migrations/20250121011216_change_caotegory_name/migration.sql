/*
  Warnings:

  - The primary key for the `categoriesonposts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `categoriesonposts` table. All the data in the column will be lost.
  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryName` to the `CategoriesOnPosts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `categoriesonposts` DROP FOREIGN KEY `CategoriesOnPosts_categoryId_fkey`;

-- DropIndex
DROP INDEX `CategoriesOnPosts_categoryId_fkey` ON `categoriesonposts`;

-- AlterTable
ALTER TABLE `categoriesonposts` DROP PRIMARY KEY,
    DROP COLUMN `categoryId`,
    ADD COLUMN `categoryName` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`postId`, `categoryName`);

-- AlterTable
ALTER TABLE `category` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Category_name_key` ON `Category`(`name`);

-- AddForeignKey
ALTER TABLE `CategoriesOnPosts` ADD CONSTRAINT `CategoriesOnPosts_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `Category`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
