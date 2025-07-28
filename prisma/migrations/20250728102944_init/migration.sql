-- CreateTable
CREATE TABLE `Class` (
    `className` INTEGER NOT NULL,

    PRIMARY KEY (`className`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentName` VARCHAR(191) NOT NULL,
    `parentName` VARCHAR(191) NOT NULL,
    `parentPhone` INTEGER NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `pincode` INTEGER NOT NULL,
    `className` INTEGER NOT NULL,
    `mentorId` INTEGER NULL,
    `fees` INTEGER NULL,
    `marks` INTEGER NULL,
    `todaysUpdate` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mentor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mentorName` VARCHAR(191) NOT NULL,
    `mentorPhone` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subjectName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Subject_subjectName_key`(`subjectName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_mentorClasses` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_mentorClasses_AB_unique`(`A`, `B`),
    INDEX `_mentorClasses_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_StudentSubjects` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_StudentSubjects_AB_unique`(`A`, `B`),
    INDEX `_StudentSubjects_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_mentorSubjects` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_mentorSubjects_AB_unique`(`A`, `B`),
    INDEX `_mentorSubjects_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_className_fkey` FOREIGN KEY (`className`) REFERENCES `Class`(`className`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_mentorId_fkey` FOREIGN KEY (`mentorId`) REFERENCES `Mentor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_mentorClasses` ADD CONSTRAINT `_mentorClasses_A_fkey` FOREIGN KEY (`A`) REFERENCES `Class`(`className`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_mentorClasses` ADD CONSTRAINT `_mentorClasses_B_fkey` FOREIGN KEY (`B`) REFERENCES `Mentor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StudentSubjects` ADD CONSTRAINT `_StudentSubjects_A_fkey` FOREIGN KEY (`A`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StudentSubjects` ADD CONSTRAINT `_StudentSubjects_B_fkey` FOREIGN KEY (`B`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_mentorSubjects` ADD CONSTRAINT `_mentorSubjects_A_fkey` FOREIGN KEY (`A`) REFERENCES `Mentor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_mentorSubjects` ADD CONSTRAINT `_mentorSubjects_B_fkey` FOREIGN KEY (`B`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
