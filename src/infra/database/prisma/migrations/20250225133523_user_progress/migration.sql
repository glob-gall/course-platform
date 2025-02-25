-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "quizzId" TEXT;

-- AlterTable
ALTER TABLE "SectionItem" ADD COLUMN     "lectureId" TEXT,
ADD COLUMN     "quizzId" TEXT;

-- CreateTable
CREATE TABLE "UserCourse" (
    "id" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "UserCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionProgress" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "userCourseId" TEXT,

    CONSTRAINT "SectionProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionItemProgress" (
    "id" TEXT NOT NULL,
    "sectionItemId" TEXT NOT NULL,
    "concluded" BOOLEAN NOT NULL,
    "sectionProgressId" TEXT,

    CONSTRAINT "SectionItemProgress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCourse" ADD CONSTRAINT "UserCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionProgress" ADD CONSTRAINT "SectionProgress_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionProgress" ADD CONSTRAINT "SectionProgress_userCourseId_fkey" FOREIGN KEY ("userCourseId") REFERENCES "UserCourse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionItemProgress" ADD CONSTRAINT "SectionItemProgress_sectionItemId_fkey" FOREIGN KEY ("sectionItemId") REFERENCES "SectionItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionItemProgress" ADD CONSTRAINT "SectionItemProgress_sectionProgressId_fkey" FOREIGN KEY ("sectionProgressId") REFERENCES "SectionProgress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionItem" ADD CONSTRAINT "SectionItem_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionItem" ADD CONSTRAINT "SectionItem_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "Quizz"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "Quizz"("id") ON DELETE SET NULL ON UPDATE CASCADE;
