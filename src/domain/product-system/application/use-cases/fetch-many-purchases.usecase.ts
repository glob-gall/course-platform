import { Either, right } from '@/core/types/either';
import { Purchase } from '../../entities/purchase.entity';
import { PurchasesRepository } from '../repositories/purchases.repository';
import { Injectable } from '@nestjs/common';

type FetchManyPurchasesResponse = Either<null, { purchases: Purchase[] }>;

@Injectable()
export class FetchManyPurchasesUsecase {
  constructor(private purchasesRepository: PurchasesRepository) {}

  async exec(): Promise<FetchManyPurchasesResponse> {
    const purchases = await this.purchasesRepository.findMany();
    return right({ purchases });
  }
}
