import { SectionItemProgresssRepository } from '@/domain/progress-system/application/repositories/section-item-progress.repository';
import { SectionItemProgress } from '@/domain/progress-system/entities/section-item-progress.entity';

export class InMemorySectionItemProgressRepository
  implements SectionItemProgresssRepository
{
  public items: SectionItemProgress[] = [];

  async findById(id: string): Promise<SectionItemProgress | null> {
    const item = this.items.find((item) => item.id.toString() === id);
    return item ?? null;
  }

  async save(progressItem: SectionItemProgress): Promise<void> {
    const index = this.items.findIndex((item) => item.id === progressItem.id);
    this.items[index] = progressItem;
  }
}
