export class HttpException extends Error {
    public readonly message: string;
    public readonly status: HttpStatusCode;

    constructor(status: HttpStatusCode, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
}
