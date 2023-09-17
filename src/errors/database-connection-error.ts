import { CustomError } from './custom-error';
export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Erreur de connexion à la base de données';

    constructor() {
        super('Erreur de connexion à la base de données');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}