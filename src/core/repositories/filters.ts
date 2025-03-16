export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export interface Filters {
  order: Order;
}
