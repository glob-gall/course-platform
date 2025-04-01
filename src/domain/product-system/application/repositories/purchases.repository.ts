import { Purchase } from '../../entities/purchase.entity';

export abstract class PurchasesRepository {
  abstract create(purchase: Purchase): Promise<void>;
  abstract save(purchase: Purchase): Promise<void>;
  abstract findById(id: string): Promise<Purchase | null>;
  abstract findByUser(userId: string): Promise<Purchase[]>;
  abstract findMany(): Promise<Purchase[]>;
}
