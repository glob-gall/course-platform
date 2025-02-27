/*
  Warnings:

  - Made the column `questionId` on table `Answer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quizzId` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `courseId` on table `Section` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sectionId` on table `SectionItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sectionProgressId` on table `SectionItemProgress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userCourseId` on table `SectionProgress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `UserCourse` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizzId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_courseId_fkey";

-- DropForeignKey
ALTER TABLE "SectionItem" DROP CONSTRAINT "SectionItem_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "SectionItemProgress" DROP CONSTRAINT "SectionItemProgress_sectionProgressId_fkey";

-- DropForeignKey
ALTER TABLE "SectionProgress" DROP CONSTRAINT "SectionProgress_userCourseId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourse" DROP CONSTRAINT "UserCourse_userId_fkey";

-- AlterTable
ALTER TABLE "Answer" ALTER COLUMN "questionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "quizzId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Section" ALTER COLUMN "courseId" SET NOT NULL;

-- AlterTable
ALTER TABLE "SectionItem" ALTER COLUMN "sectionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "SectionItemProgress" ALTER COLUMN "sectionProgressId" SET NOT NULL;

-- AlterTable
ALTER TABLE "SectionProgress" ALTER COLUMN "userCourseId" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserCourse" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "UserCourse" ADD CONSTRAINT "UserCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionProgress" ADD CONSTRAINT "SectionProgress_userCourseId_fkey" FOREIGN KEY ("userCourseId") REFERENCES "UserCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionItemProgress" ADD CONSTRAINT "SectionItemProgress_sectionProgressId_fkey" FOREIGN KEY ("sectionProgressId") REFERENCES "SectionProgress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionItem" ADD CONSTRAINT "SectionItem_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "Quizz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
