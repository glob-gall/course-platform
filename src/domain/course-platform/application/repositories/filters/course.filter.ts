export enum CourseOrder {
  DateUp = 'DATE_UP',
  DataDown = 'DATE_DOWN',
  PriceUp = 'PRICE_UP',
  PriceDown = 'PRICE_DOWN',
}
export interface CourseFilters {
  title?: string;
  // order: CourseOrder;
}
