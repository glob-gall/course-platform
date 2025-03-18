import { SectionLecture } from '@/domain/course-platform/entities/section-lecture.entity';

type LectureType = 'AUDIO' | 'VIDEO' | 'OTHER';

export class SectionLecturePresenter {
  static toHTTP(sectionLecture: SectionLecture) {
    let type: LectureType = 'OTHER';
    let resourceUrl = sectionLecture.lecture?.externalResource;

    if (sectionLecture.lecture?.audioURL) {
      type = 'AUDIO';
      resourceUrl = sectionLecture.lecture.audioURL;
    } else {
      if (sectionLecture.lecture?.videoURL) {
        type = 'VIDEO';
        resourceUrl = sectionLecture.lecture.videoURL;
      }
    }

    return {
      resourceUrl,
      id: sectionLecture.id.toString(),
      title: sectionLecture.title,
      description: sectionLecture.description,
      createdAt: sectionLecture.createdAt,
      updatedAt: sectionLecture.updatedAt,

      lectureId: sectionLecture.lecture?.id,
      lecturetitle: sectionLecture.lecture?.title,
      lectureDescription: sectionLecture.lecture?.description,
      lectureType: type,
      lectureResourceUrl: resourceUrl,
    };
  }
}
