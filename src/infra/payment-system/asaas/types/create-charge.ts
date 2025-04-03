export interface CreateChargeRequest {
  customer: string;
  billingType: 'PIX' | 'BOLETO' | 'CREDIT_CARD' | 'UNDEFINED';
  value: number;
  dueDate: Date;
}

type Discount = {
  value: number;
  limitDate: string | null;
  dueDateLimitDays: number;
  type: 'FIXED' | 'PERCENTAGE';
};

type Fine = {
  value: number;
  type: 'FIXED' | 'PERCENTAGE';
};

type Interest = {
  value: number;
  type: 'FIXED' | 'PERCENTAGE';
};

export interface CreateChargeResponse {
  object: 'payment';
  id: string;
  dateCreated: string;
  customer: string;
  paymentLink: string | null;
  value: number;
  netValue: number;
  originalValue: number | null;
  interestValue: number | null;
  description: string | null;
  billingType: 'CREDIT_CARD' | 'BOLETO' | 'PIX' | 'TRANSFER';
  confirmedDate: string | null;
  creditCard: any | null;
  pixTransaction: any | null;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED';
  dueDate: string;
  originalDueDate: string;
  paymentDate: string | null;
  clientPaymentDate: string | null;
  installmentNumber: number | null;
  invoiceUrl: string;
  invoiceNumber: string;
  externalReference: string | null;
  deleted: boolean;
  anticipated: boolean;
  anticipable: boolean;
  creditDate: string | null;
  estimatedCreditDate: string | null;
  transactionReceiptUrl: string | null;
  nossoNumero: string | null;
  bankSlipUrl: string | null;
  lastInvoiceViewedDate: string | null;
  lastBankSlipViewedDate: string | null;
  discount: Discount;
  fine: Fine;
  interest: Interest;
  postalService: boolean;
  custody: any | null;
  escrow: any | null;
  refunds: any | null;
}
