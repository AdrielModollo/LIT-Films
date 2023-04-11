import { inject, injectable } from "tsyringe";
import User from "../../infra/typeorm/entities/User";
import IUsersRepository from "../../repositories/IUsersRepository";

@injectable()
export class FindByEmailUsersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    async execute(email: string): Promise<User | undefined> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }
}
