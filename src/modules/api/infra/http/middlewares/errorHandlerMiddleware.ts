import { Request, Response, NextFunction } from 'express';
import { HttpException, HttpStatusCode } from '../../../../../shared/exceptions/HttpException';
import { ErrorResponse } from '../../../dtos/ErrorMiddlewareDTO';

export default function httpExceptionMiddleware(
    error: HttpException,
    _request: Request,
    response: Response<ErrorResponse>,
    _next: NextFunction
): Response<any, Record<string, any>> {
    const status = error.status || 500;
    let message = error.message || 'Something went wrong';

    return response.status(status).json({
        status,
        message,
    });
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    next(new HttpException(HttpStatusCode.NOT_FOUND, 'Route not found'));
};
