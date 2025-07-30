-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_className_fkey`;

-- DropIndex
DROP INDEX `Student_className_fkey` ON `student`;

-- AlterTable
ALTER TABLE `student` MODIFY `parentName` VARCHAR(191) NULL,
    MODIFY `parentPhone` BIGINT NULL,
    MODIFY `address` VARCHAR(191) NULL,
    MODIFY `pincode` INTEGER NULL,
    MODIFY `className` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_className_fkey` FOREIGN KEY (`className`) REFERENCES `Class`(`className`) ON DELETE SET NULL ON UPDATE CASCADE;
