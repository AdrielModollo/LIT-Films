import { Request, Response } from "express";
import { container } from "tsyringe";
import httpExceptionMiddleware from "../middlewares/errorHandlerMiddleware";
import { GetAllUsersService } from "../../../services/users/GetAllUsersService";
import { FindByEmailUsersService } from "../../../services/users/FindByEmailUsersService";
import { UpdateUserService } from "../../../services/users/UpdateUsersService";
import { SoftDeleteByEmailService } from "../../../services/users/SoftDeleteByEmailService";
import { softDeleteByEmailSchema } from "../schemas/users/softDeleteByEmailSchema";
import { querySchema, bodySchema } from '../schemas/users/updateUserSchema';

export default class UsersController {
    public async getAllUsers(request: Request, response: Response): Promise<Response> {
        const listUsersService = container.resolve(GetAllUsersService);

        const users = await listUsersService.execute();

        return response.json(users);
    }

    public async findByEmailUsers(request: Request, response: Response, next): Promise<Response> {
        try {
            const email = request.query.email as string;

            const findByEmail = container.resolve(FindByEmailUsersService);

            const users = await findByEmail.execute(email);

            return response.json(users);
        } catch (error) {
            return httpExceptionMiddleware(error, request, response, next);
        }
    }

    public async updateUsers(request: Request, response: Response, next): Promise<Response> {
        try {
            const { query, body } = request;
            const { email } = await querySchema.validateAsync(query);
            const { name, password } = await bodySchema.validateAsync(body);

            const updateUserService = container.resolve(UpdateUserService);
            const user = await updateUserService.execute({ email, name, password });

            return response.json(user);
        } catch (error) {
            return httpExceptionMiddleware(error, request, response, next);
        }
    }


    public async softDeleteUser(request: Request, response: Response, next): Promise<Response> {
        try {
            const { email } = await softDeleteByEmailSchema.validateAsync(request.query);

            const softDeleteUserService = container.resolve(SoftDeleteByEmailService);

            const user = await softDeleteUserService.execute({ email });

            return response.json(user);
        } catch (error) {
            return httpExceptionMiddleware(error, request, response, next);
        }
    }
}
