import { PrismaService } from '../../prisma.service';
import { PrismaPurchaseMapper } from '../../mappers/prisma-purchase.mapper';
import { Purchase } from '@/domain/product-system/entities/purchase.entity';
import { PurchasesRepository } from '@/domain/product-system/application/repositories/purchases.repository';
import { Injectable } from '@nestjs/common';
import { PrismaPurchaseWithProductMapper } from '../../mappers/prisma-purchase-with-product.mapper';
import { PrismaPurchaseProductMapper } from '../../mappers/prisma-purchase-product.mapper';

@Injectable()
export class PrismaPurchasesRepository implements PurchasesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(purchase: Purchase): Promise<void> {
    await this.prisma.purchase.create({
      data: PrismaPurchaseMapper.toPrisma(purchase),
    });
    const prismaPurchaseProducts = purchase.products.map((p) =>
      PrismaPurchaseProductMapper.toPrisma(p, purchase.id.toString()),
    );
    await this.prisma.purchaseProduct.createMany({
      data: prismaPurchaseProducts,
    });
  }

  async save(purchase: Purchase): Promise<void> {
    await this.prisma.purchase.update({
      where: { id: purchase.id.toString() },
      data: PrismaPurchaseMapper.toPrisma(purchase),
    });
  }

  async findById(id: string): Promise<Purchase | null> {
    const purchase = await this.prisma.purchase.findUnique({
      where: { id },
    });
    if (!purchase) return null;
    return PrismaPurchaseMapper.toDomain(purchase);
  }

  async findMany(): Promise<Purchase[]> {
    const purchases = await this.prisma.purchase.findMany();
    return purchases.map(PrismaPurchaseMapper.toDomain);
  }

  async findByUser(userId: string): Promise<Purchase[]> {
    const purchases = await this.prisma.purchase.findMany({
      where: {
        userId,
      },
      include: {
        purchaseProduct: {
          include: {
            product: true,
          },
        },
      },
    });
    return purchases.map(PrismaPurchaseWithProductMapper.toDomain);
  }
}
