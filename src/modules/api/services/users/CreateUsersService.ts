import { inject, injectable } from "tsyringe";
import { hash } from 'bcryptjs';
import User from "../../infra/typeorm/entities/User";
import IUsersRepository from "../../repositories/IUsersRepository";
import { HttpException, HttpStatusCode } from "../../../../shared/exceptions/HttpException";
import { IRequest } from "../../dtos/IRequestDTO";

@injectable()
export class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    async execute({ name, email, password }: IRequest): Promise<User> {
        const userExists = await this.usersRepository.findByEmail(email);

        if (userExists) {
            throw new HttpException(HttpStatusCode.CONFLICT, 'Email address already used.');
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}
