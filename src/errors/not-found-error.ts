import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
    statusCode = 404;

  constructor() {
    super('Route non trouvée');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Introuvable' }];
  }
}