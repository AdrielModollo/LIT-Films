import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException, HttpStatusCode } from '../../../../../shared/exceptions/HttpException';

export default function validateJwtSecret(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new HttpException(HttpStatusCode.INTERNAL_SERVER_ERROR, 'JWT secret not provided');
    }

    if (!authHeader) {
        throw new HttpException(HttpStatusCode.UNAUTHORIZED, 'Token not provided');
    }

    const [bearer, token] = authHeader.split(' ');

    if (!bearer || !token) {
        throw new HttpException(HttpStatusCode.UNAUTHORIZED, 'Invalid token format');
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        request.userId = decoded;
        return next();
    } catch {
        throw new HttpException(HttpStatusCode.UNAUTHORIZED, 'Invalid token');
    }
}
