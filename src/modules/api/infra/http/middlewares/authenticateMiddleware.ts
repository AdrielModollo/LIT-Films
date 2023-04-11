import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException, HttpStatusCode } from '../../../../../shared/exceptions/HttpException';
import { TokenPayload } from '../../../dtos/AuthenticateDTO';


export default function authenticate(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new HttpException(HttpStatusCode.UNAUTHORIZED, 'Token not provided');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, 'secret');

        const { id } = decoded as TokenPayload;

        request.userId = id;

        return next();
    } catch {
        throw new HttpException(HttpStatusCode.UNAUTHORIZED, 'Invalid token');
    }
}