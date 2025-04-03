export interface CreateSubscriptionRequest {
  customer: string;
  billingType: 'PIX' | 'BOLETO' | 'CREDIT_CARD' | 'UNDEFINED';
  value: number;
  nextDueDate: Date;
  cycle:
    | 'WEEKLY'
    | 'BIWEEKLY'
    | 'MONTHLY'
    | 'BIMONTHLY'
    | 'QUARTERLY'
    | 'SEMIANNUALLY'
    | 'YEARLY';
}

type Fine = {
  value: number;
  type: 'FIXED' | 'PERCENTAGE';
};

type Interest = {
  value: number;
  type: 'FIXED' | 'PERCENTAGE';
};

export interface CreateSubscriptionResponse {
  object: 'subscription';
  id: string;
  dateCreated: string;
  customer: string;
  paymentLink: string | null;
  value: number;
  nextDueDate: string;
  cycle: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  description: string | null;
  billingType: 'CREDIT_CARD' | 'BOLETO' | 'PIX' | 'TRANSFER';
  deleted: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'CANCELED';
  externalReference: string | null;
  sendPaymentByPostalService: boolean;
  fine: Fine;
  interest: Interest;
  split: any | null;
}
