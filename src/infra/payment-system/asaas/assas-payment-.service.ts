import { Injectable } from '@nestjs/common';
import { left, right } from '@/core/types/either';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import {
  CreateChargeParams,
  CreateChargeResponse,
  CreateSubscriptionParams,
  CreateSubscriptionResponse,
  CreateUserParams,
  CreateUserResponse,
  PaymentService,
} from '@/domain/product-system/payment-service/payment.service';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { AssasHttpService } from './assas-http.service';
import { PaymentProfileAlreadyExistsError } from '@/domain/product-system/payment-service/error/payment-profile-already-exists.error';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

@Injectable()
export class AssasPaymentService implements PaymentService {
  constructor(
    private prisma: PrismaService,
    private readonly asaasHttpAccess: AssasHttpService,
  ) {}

  async createUser({
    cpf,
    email,
  }: CreateUserParams): Promise<CreateUserResponse> {
    const paymentProfile = await this.prisma.assasPaymentProfile.findUnique({
      where: { cpf },
    });
    if (paymentProfile) return left(new PaymentProfileAlreadyExistsError());

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return left(new ResourceNotFoundError());

    const newAssasUser = await this.asaasHttpAccess.newCustomer({
      cpfCnpj: cpf,
      email,
      name: user.name,
    });

    this.prisma.assasPaymentProfile.create({
      data: {
        id: new UniqueEntityID().toString(),
        asaasId: newAssasUser.id,
        cpf,
        userId: user.id,
      },
    });

    return right(null);
  }

  async createCharge({
    paymentType,
    userId,
    value,
  }: CreateChargeParams): Promise<CreateChargeResponse> {
    const paymentProfile = await this.prisma.assasPaymentProfile.findUnique({
      where: { userId },
    });
    if (!paymentProfile) {
      return left(new ResourceNotFoundError());
    }

    await this.asaasHttpAccess.newCharge({
      billingType: paymentType,
      customer: paymentProfile.asaasId,
      dueDate: new Date(),
      value,
    });
    return right(null);
  }

  async createSubscription({
    customerId,
    cycle,
    paymentType,
    value,
  }: CreateSubscriptionParams): Promise<CreateSubscriptionResponse> {
    const paymentProfile = await this.prisma.assasPaymentProfile.findUnique({
      where: { userId: customerId },
    });
    if (!paymentProfile) {
      return left(new ResourceNotFoundError());
    }

    await this.asaasHttpAccess.newSubscription({
      billingType: paymentType,
      customer: paymentProfile.asaasId,
      cycle,
      nextDueDate: new Date(),
      value,
    });

    return right(null);
  }
}
