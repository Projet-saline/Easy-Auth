import  { scrypt, randomBytes} from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

export class PasswordUtils {
    static hashPassword(password: string) {
        const salt = randomBytes(8).toString('hex');
    }
    static comparePassword(storedPassword: string, suppliedPassword: string) {
        return storedPassword === suppliedPassword;
    }
}