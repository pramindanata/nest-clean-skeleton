import { BaseDomainException } from '../shared';

export class EmailTakenException extends BaseDomainException {
  constructor() {
    super('Email already taken');
  }
}

export class InvalidCredentialGivenException extends BaseDomainException {
  constructor() {
    super('Invalid credentials given');
  }
}
