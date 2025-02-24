import { SectionLecture } from '../../entities/section-lecture.entity';

export abstract class SectionLecturesRepository {
  abstract create(sectionLecture: SectionLecture): Promise<void>;
  abstract save(sectionLecture: SectionLecture): Promise<void>;
  abstract delete(sectionLecture: SectionLecture): Promise<void>;
}
