import { Filters } from '@/core/repositories/filters';

export interface CourseFilters extends Filters {
  title?: string;
}
