import { Course } from '@/domain/course-platform/entities/course.entity';
import { Product } from '@/domain/product-system/entities/product.entity';

interface SectionItemOverview {
  id: string;
  lectureTitle?: string | null;
  QuizzTitle?: string;
  externalUrl?: string | null;
}

interface SectionOverview {
  id: string;
  title: string;
  items: SectionItemOverview[];
}

interface CourseDetails {
  id: string;
  title: string;
  description?: string;
  sections: SectionOverview[];
  totalSections: number;
  totalLectures: number;
  totalQuizz: number;
}

export interface ProductDetails {
  id: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date | null;
  courses: CourseDetails[];
  priceInCents: number;
  title: string;
  maxDatePromoPrice?: Date | null;
  promoPriceInCents?: number | null;
}

function getSections(course: Course) {
  let totalLectures = 0;
  let totalQuizz = 0;
  const sectionsOverviews: SectionOverview[] = course.sections.map((s) => {
    const itemsOverviews: SectionItemOverview[] = s.items.map((item) => {
      if (item.lecture) totalLectures++;
      if (item.quizz) totalQuizz++;

      return {
        id: item.id.toString(),
        externalUrl: item.externalUrl,
        lectureTitle: item.lecture?.title,
        QuizzTitle: item.quizz?.title,
      };
    });

    return {
      id: s.id.toString(),
      items: itemsOverviews,
      title: s.title,
    };
  });

  return {
    sectionsOverviews,
    totalLectures,
    totalQuizz,
  };
}

export class ProductDetailsPresenter {
  static toHTTP(product: Product): ProductDetails {
    const coursesDetails: CourseDetails[] = product.courses.map((c) => {
      const totalSections = c.sections.length;
      const { sectionsOverviews, totalLectures, totalQuizz } = getSections(c);

      return {
        id: c.id.toString(),
        title: c.title,
        description: c.description,
        sections: sectionsOverviews,
        totalLectures,
        totalQuizz,
        totalSections,
      };
    });

    const productDetails: ProductDetails = {
      id: product.id.toString(),
      title: product.title,
      description: product.description,
      courses: coursesDetails,
      maxDatePromoPrice: product.maxDatePromoPrice,
      priceInCents: product.priceInCents,
      promoPriceInCents: product.promoPriceInCents,

      updatedAt: product.updatedAt,
      createdAt: product.createdAt,
    };

    return productDetails;
  }
}
