import { inject, injectable } from "tsyringe";
import User from "../../infra/typeorm/entities/User";
import IUsersRepository from "../../repositories/IUsersRepository";
import { IRequest } from "../../dtos/IRequestDTO";

@injectable()
export class SoftDeleteByEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }
    async execute({ email }: IRequest): Promise<User | undefined> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }

        const result = await this.usersRepository.softDeleteByEmail(email);

        return result
    }
}