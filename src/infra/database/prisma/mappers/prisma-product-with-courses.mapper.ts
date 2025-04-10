import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Prisma } from '@prisma/client';
import { PrismaProductCourseMapper } from './prisma-product-course.mapper';
import { Product } from '@/domain/product-system/entities/product.entity';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const productWithRelations = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: {
    courses: {
      include: {
        course: {
          include: {
            sections: {
              include: {
                sectionItems: {
                  include: {
                    lecture: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});

type ProductWithRelations = Prisma.ProductGetPayload<
  typeof productWithRelations
>;
export class PrismaProductWithCoursesMapper {
  static toDomain(raw: ProductWithRelations): Product {
    const product = Product.create(
      {
        description: raw.description ?? '',
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        courses: raw.courses.map((c) =>
          PrismaProductCourseMapper.toDomain(c.course),
        ),
        priceInCents: raw.priceInCents,
        title: raw.title,
        maxDatePromoPrice: raw.maxDatePromoPrice,
        promoPriceInCents: raw.promoPriceInCents,
      },
      new UniqueEntityID(raw.id),
    );

    return product;
  }
}
