/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Mentor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `mentor` ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `role` VARCHAR(191) NULL DEFAULT 'mentor';

-- AlterTable
ALTER TABLE `student` ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `role` VARCHAR(191) NULL DEFAULT 'student';

-- CreateIndex
CREATE UNIQUE INDEX `Mentor_email_key` ON `Mentor`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_email_key` ON `Student`(`email`);
