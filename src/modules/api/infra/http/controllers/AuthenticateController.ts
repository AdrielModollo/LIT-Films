import { Request, Response } from "express";
import { container } from "tsyringe";
import httpExceptionMiddleware from "../middlewares/errorHandlerMiddleware";
import AuthenticateUserService from "../../../services/auth/AuthenticateUserService";
import { authenticateSchema } from "../schemas/auth/authenticateSchema";
import { createUserSchema } from "../schemas/users/createUserSchema";
import { CreateUserService } from "../../../services/users/CreateUsersService";

export default class AuthenticateController {
    public async login(request: Request, response: Response, next): Promise<Response> {
        try {
            const { email, password } = await authenticateSchema.validateAsync(request.body);

            const authenticateUserService = container.resolve(AuthenticateUserService);

            const { user, token } = await authenticateUserService.execute({ email, password });

            return response.json({ user, token });
        } catch (error) {
            return httpExceptionMiddleware(error, request, response, next);
        }
    }

    public async create(request: Request, response: Response, next): Promise<Response> {
        try {
            const { name, email, password } = await createUserSchema.validateAsync(request.body);

            const createUserService = container.resolve(CreateUserService);

            const user = await createUserService.execute({
                name,
                email,
                password,
            });

            return response.status(201).json(user);
        } catch (error) {
            return httpExceptionMiddleware(error, request, response, next);
        }
    }
}
