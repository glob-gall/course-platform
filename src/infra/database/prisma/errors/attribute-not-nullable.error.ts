import { DatabaseError } from '@/core/errors/database.error';

export class AttributeNotNullable extends Error implements DatabaseError {
  constructor(attribute: string) {
    super(`Attribute ${attribute} not found`);
  }
}
