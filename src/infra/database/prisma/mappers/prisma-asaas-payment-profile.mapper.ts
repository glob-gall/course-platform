import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { PaymentProfile } from '@/domain/product-system/payment-service/entities/payment-profile';
import { AssasPaymentProfile as PrismaAssasPaymentProfile } from '@prisma/client';

export class PrismaAsaasPaymentProfileMapper {
  static toPrisma(paymentProfile: PaymentProfile): PrismaAssasPaymentProfile {
    return {
      id: paymentProfile.id.toString(),
      asaasId: paymentProfile.asaasId,
      cpf: paymentProfile.cpf,
      userId: paymentProfile.userId.toString(),
    };
  }

  static toDomain(raw: PrismaAssasPaymentProfile): PaymentProfile {
    const user = PaymentProfile.create(
      {
        asaasId: raw.asaasId,
        cpf: raw.cpf,
        userId: new UniqueEntityID(raw.userId),
      },
      new UniqueEntityID(raw.id),
    );

    return user;
  }
}
