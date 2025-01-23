/*
  Warnings:

  - The primary key for the `blogposttag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `blogposttag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[blogPostId,tagId]` on the table `BlogPostTag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `blogPostId` to the `BlogPostTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `BlogPostTag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `blogposttag` DROP FOREIGN KEY `BlogPostTag_postId_fkey`;

-- AlterTable
ALTER TABLE `blogpost` MODIFY `badge` VARCHAR(191) NULL,
    MODIFY `author` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `blogposttag` DROP PRIMARY KEY,
    DROP COLUMN `postId`,
    ADD COLUMN `blogPostId` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `BlogPostTag_blogPostId_tagId_key` ON `BlogPostTag`(`blogPostId`, `tagId`);

-- AddForeignKey
ALTER TABLE `BlogPostTag` ADD CONSTRAINT `BlogPostTag_blogPostId_fkey` FOREIGN KEY (`blogPostId`) REFERENCES `BlogPost`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
