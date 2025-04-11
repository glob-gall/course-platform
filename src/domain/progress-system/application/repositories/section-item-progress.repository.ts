import { SectionItemProgress } from '../../entities/section-item-progress.entity';

export interface FindByUserAndCourseParams {
  userId: string;
  courseId: string;
}

export abstract class SectionItemProgresssRepository {
  abstract findById(id: string): Promise<SectionItemProgress | null>;
  abstract save(progressItem: SectionItemProgress): Promise<void>;
}
