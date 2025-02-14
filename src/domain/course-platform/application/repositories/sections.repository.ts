import { Section } from '../../entities/section.entity';

export abstract class SectionsRepository {
  abstract create(section: Section): Promise<void>;
  abstract save(section: Section): Promise<void>;
  abstract delete(section: Section): Promise<void>;
  abstract findSectiosBySectionId(courseId: string): Promise<Section[]>;
  abstract findById(id: string): Promise<Section | null>;
}
