export class CreateOrderDto {
  orderId?: string;
  userId: string;
  productIds: string[];
  orderDate: Date;
  orderStatus: string;
  orderTotal: number;
  orderAddress: string;
}

export enum ORDER_STATUS {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  IN_PROGRESS = 'IN_PROGRESS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  IN_TRANSIT = 'IN_TRANSIT',
}
