import { PrismaService } from '../../prisma.service';
import { PrismaSubscriptionMapper } from '../../mappers/prisma-subscription.mapper';
import { Subscription } from '@/domain/product-system/entities/subscription.entity';
import { SubscriptionsRepository } from '@/domain/product-system/application/repositories/subscriptions.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaSubscriptionsRepository implements SubscriptionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(subscription: Subscription): Promise<void> {
    await this.prisma.subscription.create({
      data: PrismaSubscriptionMapper.toPrisma(subscription),
    });
  }

  async save(subscription: Subscription): Promise<void> {
    await this.prisma.subscription.update({
      where: { id: subscription.id.toString() },
      data: PrismaSubscriptionMapper.toPrisma(subscription),
    });
  }

  async findById(id: string): Promise<Subscription | null> {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id },
    });
    if (!subscription) return null;
    return PrismaSubscriptionMapper.toDomain(subscription);
  }

  async findMany(): Promise<Subscription[]> {
    const subscriptions = await this.prisma.subscription.findMany();
    return subscriptions.map(PrismaSubscriptionMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.subscription.delete({
      where: {
        id,
      },
    });
  }
}
