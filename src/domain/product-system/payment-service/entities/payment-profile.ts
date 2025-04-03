import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';

export interface PaymentProfileProps {
  cpf: string;
  asaasId: string;
  userId: UniqueEntityID;
}

export class PaymentProfile extends Entity<PaymentProfileProps> {
  public get cpf() {
    return this.props.cpf;
  }
  public get userId() {
    return this.props.userId;
  }
  public get asaasId() {
    return this.props.asaasId;
  }

  static create(
    props: PaymentProfileProps,
    id?: UniqueEntityID,
  ): PaymentProfile {
    const lecture = new PaymentProfile(props, id);
    return lecture;
  }
}
