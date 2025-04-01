import { PurchasesRepository } from '@/domain/product-system/application/repositories/purchases.repository';
import { Purchase } from '@/domain/product-system/entities/purchase.entity';

export class InMemoryPurchasesRepository implements PurchasesRepository {
  public items: Purchase[] = [];

  async create(purchase: Purchase): Promise<void> {
    this.items.push(purchase);
  }

  async save(purchase: Purchase): Promise<void> {
    const index = this.items.findIndex((item) => item.id === purchase.id);
    this.items[index] = purchase;
  }

  async findById(id: string): Promise<Purchase | null> {
    const purchase = this.items.find((item) => item.id.toString() === id);
    if (!purchase) return null;
    return purchase;
  }

  async findByUser(userId: string): Promise<Purchase[]> {
    const userPurchases = this.items.filter(
      (item) => item.userId.toString() === userId,
    );
    return userPurchases;
  }

  async findMany(): Promise<Purchase[]> {
    return this.items;
  }
}
