import { inject, injectable } from "tsyringe";
import { hash } from 'bcryptjs';
import User from "../../infra/typeorm/entities/User";
import IUsersRepository from "../../repositories/IUsersRepository";
import { IRequest } from "../../dtos/IRequestDTO";

@injectable()
export class UpdateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    async execute({ email, name, password }: IRequest): Promise<User> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }

        const hashedPassword = await hash(password, 8);

        const updatedUser = {
            ...user,
            name,
            password: hashedPassword,
        };

        const result = await this.usersRepository.updateUsers(updatedUser.id, updatedUser);

        return result;
    }
}
