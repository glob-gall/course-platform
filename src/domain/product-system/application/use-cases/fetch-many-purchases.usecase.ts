import { Either, right } from '@/core/types/either';
import { Purchase } from '../../entities/purchase.entity';
import { PurchasesRepository } from '../repositories/purchases.repository';

type FetchManyPurchasesResponse = Either<null, { purchases: Purchase[] }>;

export class FetchManyPurchasesUsecase {
  constructor(private purchasesRepository: PurchasesRepository) {}

  async exec(): Promise<FetchManyPurchasesResponse> {
    const purchases = await this.purchasesRepository.findMany();
    return right({ purchases });
  }
}
