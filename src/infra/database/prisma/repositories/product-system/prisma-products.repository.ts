import { PrismaService } from '../../prisma.service';
import { PrismaProductMapper } from '../../mappers/prisma-product.mapper';
import { Product } from '@/domain/product-system/entities/product.entity';
import { ProductsRepository } from '@/domain/product-system/application/repositories/products.repository';
import { Injectable } from '@nestjs/common';
import { PrismaProductWithCoursesMapper } from '../../mappers/prisma-product-with-courses.mapper';

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: Product): Promise<void> {
    await this.prisma.product.create({
      data: PrismaProductMapper.toPrisma(product),
    });
    await this.prisma.courseProduct.createMany({
      data: product.courses.map((c) => ({
        courseId: c.id.toString(),
        productId: product.id.toString(),
      })),
    });
  }

  async save(product: Product): Promise<void> {
    await this.prisma.product.update({
      where: { id: product.id.toString() },
      data: PrismaProductMapper.toPrisma(product),
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) return null;
    return PrismaProductMapper.toDomain(product);
  }
  async findManyByIds(ids: string[]): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { id: { in: ids } },
    });

    return products.map(PrismaProductMapper.toDomain);
  }

  async findMany(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    return products.map(PrismaProductMapper.toDomain);
  }

  async findDetailsById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
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
                        quizz: true,
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
    if (!product) return null;
    return PrismaProductWithCoursesMapper.toDomain(product);
  }
}
